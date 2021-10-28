from django.core.exceptions import ValidationError
from lxml import etree
from .serializers import TaggingSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json
from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from .models import Judgment, Schema
from .forms import AddJudgmentModelForm, AddSchemaForm, AddSchemaJudgmentsForm, ParseXMLForm
from users.models import Tagging, Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django import forms


@login_required
def index(request):
    # the home page shows the list of assigned judgments
    return redirect('/sentenze/')


@login_required
def list_sentenze(request):
    current_user = request.user
    profile = Profile.objects.get(user=current_user)
    sentenze = Judgment.objects.all()

    # admins and editors has access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            # 'sentenze': current_user.profile.taggings.all()
            'sentenze': Tagging.objects.filter(profile=profile)
        }
        return render(request, 'tag_sentenze/list_sentenze.html', context=context)
    # taggatori has access only to their set of sentenze, so they will see a list of this set
    else:
        # sentenze_user = current_user.profile.taggings.all()
        sentenze_user = Tagging.objects.filter(profile=profile)

        for elem in sentenze_user:
            print('{} con id: '.format(elem, elem.id))

        print('Current user: ', current_user)
        print('Permission: ', sentenze_user)
        return render(request, 'tag_sentenze/list_sentenze.html', {'sentenze': sentenze_user})


@login_required
def new_sentenza(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        form = AddJudgmentModelForm()

        if request.method == 'POST':
            # Create a form instance and populate it with data from the request
            form = AddJudgmentModelForm(request.POST, request.FILES)
            # Check if the form is valid:
            if form.is_valid():
                # save the form into the DB
                form.save()
                # assign a tagging object to all editors and admins
                auto_assignment(form.instance.id)

                # redirect home
                return HttpResponseRedirect(reverse('tag_sentenze:index'))

        context = {
            'form': form,
        }
        return render(request, 'tag_sentenze/new_sentenza.html', context=context)
    else:
        print('Taggatore access')
        return redirect('/sentenze/')


@login_required
def tag_sentenza(request, id, htbp=-1):
    try:
        # sentenza = Judgment.objects.get(pk=id)
        sentenza = Tagging.objects.get(id=id).judgment
    except Judgment.DoesNotExist:
        raise Http404()

    current_user = request.user
    profile = Profile.objects.get(user=request.user)
    user_taggings = current_user.profile.taggings.all()

    # admins and editors have access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        # retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings': Tagging.objects.filter(profile=profile, judgment=sentenza)[0],
            'must_parse': htbp > -1
        }
        print("---->", context['taggings'].id)
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    # taggatori has access only to their set of sentenze
    elif sentenza in user_taggings:
        print('Taggatore access with permission')
        # retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings': Tagging.objects.filter(profile=profile, judgment=sentenza)[0],
            'must_parse': htbp > -1
        }
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    else:
        print('Taggatori access with no permission')
        return redirect('/sentenze/')


@login_required
def graph(request, id):
    try:
        # sentenza = Judgment.objects.get(pk=id)
        sentenza = Tagging.objects.get(id=id).judgment
    except Judgment.DoesNotExist:
        raise Http404()

    current_user = request.user
    profile = Profile.objects.get(user=request.user)
    user_taggings = current_user.profile.taggings.all()

    # admins and editors have access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        # retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings': Tagging.objects.filter(profile=profile, judgment=sentenza)[0]
        }
        if 'arg' in request.get_full_path():
            context['type'] = 'arg'
        else:
            context['type'] = 'rel'

        return render(request, 'tag_sentenze/graph.html', context=context)
    # taggatori has access only to their set of sentenze
    elif sentenza in user_taggings:
        print('Taggatore access with permission')
        # retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings': Tagging.objects.filter(profile=profile, judgment=sentenza)[0]
        }
        if 'arg' in request.get_full_path():
            context['type'] = 'arg'
        else:
            context['type'] = 'rel'

        return render(request, 'tag_sentenze/graph.html', context=context)
    else:
        print('Taggatori access with no permission')
        return redirect('/sentenze/')


@login_required
def new_schema(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = AddSchemaForm()
        print("Admin/Editor access")
        if request.method == 'POST':
            # Create a form instance for the schema and add data
            form = AddSchemaForm(request.POST, request.FILES)
            # Check if the form is valid:
            if form.is_valid():
                # save the form into the Database
                form.save()
                # redirect home
                return HttpResponseRedirect(reverse('tag_sentenze:index'))

        context = {
            'form': form,
        }
        return render(request, 'tag_sentenze/new_schema.html', context=context)
    else:
        print('Taggatore access')
        return redirect('/sentenze/')

# upload multiplo


@login_required
def add_multiple_judgments(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = AddSchemaJudgmentsForm()
        print("Admin/Editor access")
        if request.method == 'POST':
            # Get all the file uploaded
            judgment_files = request.FILES.getlist('judgments')

            form = AddSchemaJudgmentsForm(request.POST)

            if form.is_valid():
                schema = form.cleaned_data['schema']
                print(Schema.objects.get(id=schema.id))

                for judgment in judgment_files:
                    print(str(judgment))
                    new_judg = Judgment.objects.create(
                        judgment_file=judgment,
                        xsd=Schema.objects.get(id=schema.id),
                    )
                    new_judg.save()

                    # auto assign the new uploaded judgments to all editor and admin users
                    auto_assignment(new_judg.id)

                # redirect home
                return HttpResponseRedirect(reverse('tag_sentenze:index'))

        # add the CoicheField with the schemas
        context = {
            'form': form,
        }

        return render(request, 'tag_sentenze/add_multiple_judgment.html', context=context)
    else:
        print('Taggatore access')
        return redirect('/sentenze/')


@login_required
def add_multiple_schemas(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        if request.method == 'POST':
            # Get all the file uploaded
            schema_files = request.FILES.getlist('schemas')

            for schema in schema_files:
                print(schema)
                new_schema = Schema.objects.create(
                    schema_file=schema,
                )
                new_schema.save()

            # redirect home
            return HttpResponseRedirect(reverse('tag_sentenze:index'))

        return render(request, 'tag_sentenze/add_multiple_schema.html')
    else:
        print('Taggatore access')
        return redirect('/sentenze/')

# automatic assignment of a new uploaded judgment to all editors and admins


def auto_assignment(judgment_id, current_user_id=-1, xml_string=""):
    admins = list(User.objects.filter(groups__name='Admins'))
    editors = list(User.objects.filter(groups__name='Editors'))
    both_users = admins + editors
    both_users = set(both_users)  # remove duplicates

    # list with all id of editors and admins users
    id_list = [user.id for user in both_users]

    ret = -1
    # create the new tagging
    for user_id in id_list:
        if user_id == current_user_id:
            new_tagging = Tagging.objects.create(
                profile=Profile.objects.get(pk=user_id),
                judgment=Judgment.objects.get(id=judgment_id),
                xml_text=xml_string,
            )
            ret = new_tagging.id
        else:
            new_tagging = Tagging.objects.create(
                profile=Profile.objects.get(pk=user_id),
                judgment=Judgment.objects.get(id=judgment_id),
            )

    return ret


@login_required
def download(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Tagging.DoesNotExist:
        raise Http404()

    current_user = request.user

    # taggers don't have access to this functionality
    if not current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return redirect('/')

    # load tagging xml text
    response = {
        'name': tagging.judgment.name[:tagging.judgment.name.rfind(".")],
        'xml': tagging.xml_text
    }
    return JsonResponse(response)


@login_required
def list_taggings(request):
    current_user = request.user
    taggings = Tagging.objects.all()

    # admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'taggings': taggings
        }
        return render(request, 'tag_sentenze/list_taggings.html', context=context)
    # taggatori don't
    else:
        print('Taggatore access')
        return redirect('/sentenze')


@login_required
def parse_xml(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():

        form = ParseXMLForm()

        if request.method == 'POST':
            # Create a form instance and populate it with data from the request
            form = ParseXMLForm(request.POST, request.FILES)
            # Check if the form input is valid:
            if form.is_valid():
                new_schema = False

                # we have an xml file and either an xsd file or a Schema
                # build xml string from file
                xml_string = b""
                f = request.FILES["xml_file"]
                for chunk in f.chunks():
                    xml_string += chunk

                # build xsd string
                xsd_text = ""

                # case 1: xml file + xsd file
                if "xsd_file" in request.FILES.keys():
                    # print("xsd_file")
                    f = request.FILES["xsd_file"]
                    for chunk in f.chunks():
                        xsd_text += chunk.decode("utf-8")

                    new_schema = True
                # case 2: xml file + Schema
                else:
                    # print("schema")
                    id_xsd_schema = form.data['schema']
                    schema = Schema.objects.get(id=id_xsd_schema)
                    xsd_text = schema.tags.encode("ascii")

                # validate xml-xsd
                schema_root = etree.XML(xsd_text)
                xmlschema = etree.XMLSchema(schema_root)
                parser = etree.XMLParser(schema=xmlschema)
                try:
                    etree.fromstring(xml_string, parser)
                except etree.XMLSyntaxError as error:
                    # if not valid raise error message
                    form.add_error(None, forms.ValidationError(
                        "XML text didn't pass validation with respect to the XSD"))
                    form.add_error(None, forms.ValidationError(
                        str(error)))
                    context = {
                        'form': form,
                    }
                    return render(request, 'tag_sentenze/parse_xml.html', context=context)

                # now we have xml and xsd texts and they are validated!
                # we need to save them somehow in the database

                # if there is a new schema to upload
                if new_schema:
                    # we create it
                    schema = Schema(schema_file=request.FILES["xsd_file"])
                    schema.save()

                # also we need to save the judgment
                tree = etree.fromstring(xml_string)
                notags = etree.tostring(
                    tree, encoding='utf8', method='text').decode("utf-8")
                notags = notags.strip().replace("\n", "\n <br/> ")
                judgment = Judgment.objects.create(
                    judgment_file=request.FILES["xml_file"], initial_text=notags, xsd=schema)
                # assign a tagging object to all editors and admins
                tagging_id = auto_assignment(
                    judgment.id, request.user.id, xml_string.decode("utf-8"))

                # and then load the tagging interface
                return redirect(reverse("tag_sentenze:tag-sentenza", kwargs={"id": tagging_id, "htbp": 1}))

        # either schema not valid or GET request -> re-display form
        context = {
            'form': form,
        }
        return render(request, 'tag_sentenze/parse_xml.html', context=context)
    else:  # no permission
        return redirect('/sentenze/')


# APIs


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def tagging_detail(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Tagging.DoesNotExist:
        raise Http404()

    # check permission
    user_tagging = Tagging.objects.filter(profile=request.user.profile)
    if tagging not in user_tagging:
        return Response({"detail": "Not found"})

    serializer = TaggingSerializer(tagging, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_tagging(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Tagging.DoesNotExist:
        raise Http404()

    # check permission
    # TODO: why is request.user AnonymousUser ????
    # user_tagging = Tagging.objects.filter(profile=request.user.profile)
    # if tagging not in user_tagging:
    #     return Response({"detail":"Not found"})

    # read tm from request
    token_manager = json.dumps(request.data['tm'])
    completed = False

    serializer = TaggingSerializer(instance=tagging, data={
                                   'token_manager': token_manager, 'completed': completed}, partial=True, many=False)
    if serializer.is_valid():
        serializer.save()
    return HttpResponse("Updated")


@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def completed_tagging(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Tagging.DoesNotExist:
        raise Http404()

    # check permission
    # TODO: why is request.user AnonymousUser ????
    # user_tagging = Tagging.objects.filter(profile=request.user.profile)
    # if tagging not in user_tagging:
    #     return Response({"detail":"Not found"})

    # read tm and cp from request
    token_manager = json.loads(request.data['tm'])
    completed = request.data['cp']

    if completed:
        # build xml_string
        words = []
        s = token_manager['tokens']  # stack
        while s:
            t = s.pop(0)
            if isinstance(t, str):  # <tag>
                words.append(t)
            elif 'text' in t:       # token
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
                            f' {k}="{" ".join(v["value"])}"'
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
        xml_string = ' '.join(words)
        xml_string = """<body>\n""" + xml_string + """\n</body>"""
        # print(xml_string)

        # validate xml
        schema_string = tagging.judgment.xsd.tags
        schema_root = etree.XML(schema_string.encode('ascii'))
        xmlschema = etree.XMLSchema(schema_root)
        parser = etree.XMLParser(schema=xmlschema)
        try:
            etree.fromstring(xml_string, parser)
        except etree.XMLSyntaxError as error:
            # if not valid return fail with error message
            # print(str(error))
            return Response(data={str(error)}, status=500)

        # else if valid then save in db WITH XML TEXT and return success
        serializer = TaggingSerializer(instance=tagging, data={'token_manager': json.dumps(
            request.data['tm']), 'completed': completed, 'xml_text': xml_string}, partial=True, many=False)

        if serializer.is_valid():
            serializer.save()

        return Response("Updated")

    # if set uncompleted then save in db and return success
    serializer = TaggingSerializer(instance=tagging, data={'token_manager': json.dumps(
        request.data['tm']), 'completed': completed, }, partial=True, many=False)
    if serializer.is_valid():
        serializer.save()

    return Response("Updated")
