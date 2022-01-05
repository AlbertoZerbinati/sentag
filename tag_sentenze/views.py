import xmlschema
import json

from .serializers import TaggingSerializer, TaggingTaskSerializer
from .models import Judgment, Schema
from users.models import Tagging, Profile, Task, TaggingTask

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.db.models import Count


@login_required
def index(request):
    # the home page shows the list of assigned judgments
    return redirect('tag_sentenze:my-tasks')


# list all current user's tasks, allowing him to TAG them
@login_required
def my_tasks(request):
    current_user = request.user

    # query for all Tasks of current User
    tasks = Task.objects.filter(users__username__contains=current_user).annotate(
        n_docs=Count('judgments')).values()
    context = {
        'tasks': tasks
    }
    return render(request, 'tag_sentenze/list_tasks_tag.html', context=context)

# list all taggings inside a Task for the current user, allowing him to TAG them


@login_required
def my_taggings(request, id):
    current_user = request.user

    task_name = Task.objects.get(id=id).name

    # query all TaggingTask for the ones having the correct (task(id), user(current))
    # -> get the docs
    taggings = TaggingTask.objects.filter(
        task=id, user__username__contains=current_user)

    context = {
        'task_name': task_name,
        'taggings': taggings
    }
    return render(request, 'tag_sentenze/list_taggings_tag.html', context=context)


@login_required
def tag_sentenza(request, id, htbp=-1):
    try:
        # sentenza = Judgment.objects.get(pk=id)
        tagging = TaggingTask.objects.get(id=id)
    except TaggingTask.DoesNotExist:
        raise Http404()

    current_user = request.user

    # check if this tagging has to be parsed
    if tagging.xml_text.startswith("<sentag>") and tagging.token_manager == "":
        htbp = 1

    # check that the request tagging belongs to the user
    if current_user == tagging.user:
        context = {
            'tagging': tagging,
            'must_parse': htbp > -1
        }
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    else:
        # no permission')
        return redirect('tag_sentenze:my-tasks')


# creates a new TaggingTask for the triple (task, doc, user)
def assign_doc_to_user(task_id, judgment_id, user_id, xml_string=""):
    # get the triple (task, doc, user)
    task = Task.objects.get(id=task_id)
    judgment = Judgment.objects.get(id=judgment_id)
    user = User.objects.get(id=user_id)

    # build a TaggingTask with that triple
    ret = -1
    new_tagging = TaggingTask.objects.create(
        task=task,
        judgment=judgment,
        user=user,
        xml_text=xml_string,
    )
    ret = new_tagging.id

    return ret

# deletes the TaggingTask for the triple (task, doc, user)


def remove_doc_from_user(task_id, judgment_id, user_id):
    # get the triple (task, doc, user)
    task = Task.objects.get(id=task_id)
    judgment = Judgment.objects.get(id=judgment_id)
    user = User.objects.get(id=user_id)

    # delete a TaggingTask with that triple
    tagging = TaggingTask.objects.get(
        task=task,
        judgment=judgment,
        user=user,
    )

    tagging.delete()


@login_required
def download(request, id):
    try:
        tagging = TaggingTask.objects.get(pk=id)
    except TaggingTask.DoesNotExist:
        raise Http404()

    current_user = request.user

    # annotators don't have access to this functionality
    if not current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return redirect('/')

    # load tagging xml text
    response = {
        'name': tagging.judgment.name[:tagging.judgment.name.rfind(".")],
        'xml': tagging.xml_text
    }
    return JsonResponse(response)


@login_required
def taggings_download(request):
    current_user = request.user
    taggings = TaggingTask.objects.all()

    # admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'taggings': taggings
        }
        return render(request, 'tag_sentenze/list_taggings_download.html', context=context)
    # annotators don't
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')


# APIs


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def tagging_detail(request, id):
    try:
        tagging = TaggingTask.objects.get(pk=id)
    except TaggingTask.DoesNotExist:
        raise Http404()

    # check permission
    user_tagging = TaggingTask.objects.filter(user=request.user)
    if tagging not in user_tagging:
        return Response({"detail": "Not found"})

    serializer = TaggingTaskSerializer(tagging, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_tagging(request, id):
    try:
        tagging = TaggingTask.objects.get(pk=id)
    except TaggingTask.DoesNotExist:
        raise Http404()

    # check permission
    # TODO: why is request.user AnonymousUser ????
    # user_tagging = Tagging.objects.filter(profile=request.user.profile)
    # if tagging not in user_tagging:
    #     return Response({"detail":"Not found"})

    # read tm from request
    token_manager = json.loads(request.data['tm'])
    comments = request.data['comments']
    completed = False

    xml_string = generate_xml_from_tm(token_manager)

    # update the xml text without validation

    # TODO: add check for missing attributes

    serializer = TaggingTaskSerializer(instance=tagging, data={
        'token_manager': json.dumps(request.data['tm']), 'comments': comments, 'xml_text': xml_string, 'completed': completed},
        partial=True, many=False)

    if serializer.is_valid():
        serializer.save()
        print("valid")
    else:
        return HttpResponse("Server error", status="500")

    return HttpResponse("OK", status="200")


@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def completed_tagging(request, id):
    try:
        tagging = TaggingTask.objects.get(pk=id)
    except TaggingTask.DoesNotExist:
        raise Http404()

    # check permission
    # TODO: why is request.user AnonymousUser ????
    # user_tagging = Tagging.objects.filter(profile=request.user.profile)
    # if tagging not in user_tagging:
    #     return Response({"detail":"Not found"})

    # read tm and cp from request
    token_manager = json.loads(request.data['tm'])
    comments = request.data['comments']
    completed = request.data['cp']

    if completed:
        # build xml_string
        xml_string = generate_xml_from_tm(token_manager)

        # validate xml
        schema_string = tagging.task.xsd.tags
        schema = xmlschema.XMLSchema11(schema_string.encode('utf-8'))
        try:
            xmlschema.validate(xml_string, schema, cls=xmlschema.XMLSchema11)
        except xmlschema.XMLSchemaValidationError as error:
            # if not valid return fail with error message
          # print(str(error))
            return Response(data={"Validation error:\n\n" + str(error)[:str(error).find("Schema")-2]}, status=500)

        # else if valid then save in db WITH XML TEXT and return success
        serializer = TaggingTaskSerializer(instance=tagging, data={'token_manager': json.dumps(
            request.data['tm']), 'comments': comments, 'completed': completed, 'xml_text': xml_string}, partial=True, many=False)

        if serializer.is_valid():
            serializer.save()

        return HttpResponse("OK", status="200")

    # if set uncompleted then save in db and return success
    serializer = TaggingTaskSerializer(instance=tagging, data={'token_manager': json.dumps(
        request.data['tm']), 'completed': completed, }, partial=True, many=False)
    if serializer.is_valid():
        serializer.save()

    return HttpResponse("OK", status="200")


def generate_xml_from_tm(token_manager):
    """stack technique to generate the xml from the token manager"""

    words = []
    s = token_manager['tokens']  # stack
    while s:
        t = s.pop(0)
        if isinstance(t, str):  # <tag>
            words.append(t)
        elif t['type'] == 'token':       # token
            if t['text'] == '<br/>':
                words.append('\n')
            else:
                words.append(t['text'])
        else:                   # token block
            # append start-tag
            label = t['label']
            start_tag = '<' + str(label)
            for k, v in t['attrs'].items():
                if v['value'][0] != "":
                    start_tag = start_tag + \
                        f' {k}="{" ".join([str(val).split("|")[0].strip() for val in v["value"]])}"'
            start_tag = start_tag + '>'
            words.append(start_tag)

            # push end-tag
            end_tag = '</' + str(label) + '>'
            s.insert(0, end_tag)

            # push tokens in reversed order
            for child in reversed(t['tokens']):
                s.insert(0, child)

    # TODO: incipit XML
    # print(words)

    # add spaces where needed in the words list
    spaced_words = []
    for v, w in zip(words[:], words[1:]):
        # \n
        if v == "\n" or w == "\n":
            spaced_words.append(v)
        # word word
        elif not "<" in v and not "<" in w:
            spaced_words.append(v+" ")
        # <> word
        elif v.startswith("<") and not v.startswith("</") and not "<" in w:
            spaced_words.append(v)
        # </> word
        elif v.startswith("</") and not "<" in w:
            spaced_words.append(v+" ")
        # word <>
        elif w.startswith("<") and not w.startswith("</") and not "<" in v:
            spaced_words.append(v+" ")
        # word </>
        elif w.startswith("</") and not "<" in v:
            spaced_words.append(v)
        # <> <>
        elif v.startswith("<") and not v.startswith("</") and w.startswith("<") and not w.startswith("</"):
            spaced_words.append(v)
        # </> </>
        elif v.startswith("</") and w.startswith("</"):
            spaced_words.append(v)
        # </> </>
        elif v.startswith("</") and w.startswith("<") and not w.startswith("</"):
            spaced_words.append(v+" ")
    spaced_words.append(words[-1])

    xml_string = "".join(spaced_words)
    xml_string = """<sentag>\n""" + xml_string + """\n</sentag>"""

    return xml_string


@login_required
def list_tasks_download(request):
    current_user = request.user
    tasks = Task.objects.annotate(n_docs=Count(
        'judgments'), n_users=Count('users')).values()

    # admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'tasks': tasks
        }
        print(context)
        return render(request, 'tag_sentenze/list_tasks_download.html', context=context)
    # annotators don't
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')


@login_required
def list_taggings_download(request, id):
    current_user = request.user
    task = Task.objects.get(id=id)
    judgments = task.judgments.all()
    users = task.users.all()

    # admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'judgments': judgments,
            'users': users
        }
        print(context)
        return render(request, 'tag_sentenze/list_tagging_user_task_download.html', context=context)
    # annotators don't
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')
