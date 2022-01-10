import pandas as pd
import simpledorff
import json
import re

from lxml import etree

from django.shortcuts import render, redirect, reverse
from django.http import Http404, JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required

from tag_sentenze.views import assign_doc_to_user, remove_doc_from_user
from .forms import UserRegisterForm, TaskModelForm, AddJudgmentsForm, ParseXMLForm
from .models import Tagging, TaggingTask, Profile
from tag_sentenze.models import Judgment, Schema, Task
from django.db.models import Count


@login_required
def register(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = UserRegisterForm()
        if request.method == 'POST':
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                # Add by default the new user to the Annotators Group
                annotators = Group.objects.get(name='Annotators')
                annotators.user_set.add(User.objects.get(username=username))
                return redirect('/')

        return render(request, 'users/register.html', context={'form': form})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def home_permission(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        # get all users from Annotators group
        annotators = User.objects.filter(groups__name='Annotators').all()
      # print(annotators)

        context = {
            'lista_users': annotators,
            'sentenze': Judgment.objects.all()
        }

        return render(request, 'users/home_permission.html', context=context)
    else:
        return redirect('tag_sentenze:my-tasks')


@login_required
def user_permission(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        raise Http404("The selected user doesn't exist")

    # contains a list of all the sentenze the selected user has access to
    permission_list = user.profile.taggings.all()

    # contains the rest of the sentenze (all sentenze - selected user sentenze)
    all_sentenze = Judgment.objects.all()
    for elem in all_sentenze:
        if elem in permission_list:
            all_sentenze = all_sentenze.exclude(pk=elem.id)

    context = {
        'permission': permission_list,
        'selected_user': user,
        'lista_users': User.objects.filter(groups__name='Annotators').all(),
        'sentenze': all_sentenze
    }

    return render(request, 'users/permission_page.html', context=context)


@login_required
def add_permission(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenza'] = request.POST.get('selected_sentenza')

    # print(data)

    # get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    # print(sentenze)

    # add a new sentenza to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    permission_list = selected_user.profile.taggings.all()
    if selected_sentenza not in permission_list:
        selected_user.profile.taggings.add(selected_sentenza)

  # print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)
    # return user_permission(request, selected_user.id)


@login_required
def remove_permission(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenza'] = request.POST.get('selected_sentenza')

  # print(data)

    # remove the selected sentenza to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    permission_list = selected_user.profile.taggings.all()
    if selected_sentenza in permission_list:
        selected_user.profile.taggings.remove(selected_sentenza)

  # print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def add_permission_list(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenze'] = request.POST.get('selected_sentenze')

  # print(data)

    # get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    # print(sentenze)

    # add a new list of sentenze to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
  # print(selected_sentenze)

    permission_list = selected_user.profile.taggings.all()

    for elem in selected_sentenze:
        tmp_sentenza = Judgment.objects.get(id=elem)
      # print(tmp_sentenza.id)
        if tmp_sentenza not in permission_list:
            selected_user.profile.taggings.add(tmp_sentenza)

  # print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def remove_permission_list(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenze'] = request.POST.get('selected_sentenze')

  # print(data)

    # get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    # print(sentenze)

    # remove a list of sentenze from the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
  # print(selected_sentenze)

    permission_list = selected_user.profile.taggings.all()

    for elem in selected_sentenze:
        tmp_sentenza = Judgment.objects.get(id=elem)
      # print(tmp_sentenza.id)
        if tmp_sentenza in permission_list:
            selected_user.profile.taggings.remove(tmp_sentenza)

  # print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def home_judgment_schema(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        # get all users from Annotators group
        schemas = Schema.objects.all()
      # print(schemas)

        context = {
            'lista_schemas': schemas,
            'sentenze': Judgment.objects.all()
        }

        return render(request, 'users/home_sentenza_schema.html', context=context)
    else:
        return redirect('tag_sentenze:my-tasks')


@login_required
def join_schema(request, id):
    try:
        schema = Schema.objects.get(pk=id)
    except User.DoesNotExist:
        #raise Http404("The selected user doesn't exist")
        schema = Schema.objects.get(pk=1)

    # contains a list of all the sentenze related to the current selected schema
    sentenze_list = Judgment.objects.filter(xsd=schema)

    all_judgments = Judgment.objects.all()

    # contains the rest of the sentenze (all sentenze - selected user sentenze)
    for elem in all_judgments:
        if elem in sentenze_list:
            all_judgments = all_judgments.exclude(pk=elem.id)

    context = {
        'sentenze_schema': sentenze_list,
        'selected_schema': schema,
        'schema_id': schema.id,
        'lista_schema': Schema.objects.all(),
        'sentenze': all_judgments
    }

    return render(request, 'users/sentenza_schema.html', context=context)


@login_required
def add_sentenza_schema(request, schema):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['schema'] = request.POST.get('selected_schema')
        data['sentenza'] = request.POST.get('selected_sentenza')

  # print(data)

    # add the schema to the selected judgment
    selected_schema = Schema.objects.get(id=data['schema'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    selected_sentenza.xsd = selected_schema

    selected_sentenza.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def remove_sentenza_schema(request, schema):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['schema'] = request.POST.get('selected_schema')
        data['sentenza'] = request.POST.get('selected_sentenza')

  # print(data)

    # remove the schema to the selected judgment
    selected_schema = Schema.objects.get(id=data['schema'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    selected_sentenza.xsd = None

    selected_sentenza.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def add_sentenza_schema_list(request, schema):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['schema'] = request.POST.get('selected_schema')
        data['sentenze'] = request.POST.get('selected_sentenze')

    # add a schema to a list of selected judgments
    selected_schema = Schema.objects.get(id=data['schema'])
    selected_sentenze = json.loads(data['sentenze'])

    for sentenza in selected_sentenze:
        sel_sent = Judgment.objects.get(id=sentenza)
        sel_sent.xsd = selected_schema
        sel_sent.save()

    return JsonResponse({'response': data}, status=200)


@login_required
def remove_sentenza_schema_list(request, schema):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['schema'] = request.POST.get('selected_schema')
        data['sentenze'] = request.POST.get('selected_sentenze')

    # add a schema to a list of selected judgments
    selected_schema = Schema.objects.get(id=data['schema'])
    selected_sentenze = json.loads(data['sentenze'])

    for sentenza in selected_sentenze:
        sel_sent = Judgment.objects.get(id=sentenza)
        sel_sent.xsd = None
        sel_sent.save()

    return JsonResponse({'response': data}, status=200)


# Agreement code
def calc_agreement(task_id, judgment_id):

    #print('------------------ CALCOLO AGREEMENT -------------------')

    # Creation of a list with all judgment tokens
    judgment = Judgment.objects.get(id=judgment_id)
    judgment_text = judgment.initial_text
    judgment_tokens = judgment_text.split(' ')

    # dictionary with token-value pairs
    tokens_value = {}

    # assign a integer value to every judgment's token
    for i in range(len(judgment_tokens)):
        tokens_value[judgment_tokens[i]] = i+1

    # Get the schema associated to the Judgment and create dictionary with all the tags
    print(task_id)
    schema = Task.objects.get(id=task_id).xsd.schema_file

    tree = etree.ElementTree(file=schema)
    tags = tree.xpath("//xsd:element/@name",
                      namespaces={"xsd": "http://www.w3.org/2001/XMLSchema"})

    tags_value = {}

    for i in range(len(tags)):
        tags_value[tags[i]] = i+1

    # Data structure for calculate the agreement
    data = {'unit_id': [],
            'annotator_id': [],
            'annotation': []}

    # flag to see if at least two or more users has a token manager not empty
    flag = 0
    
    # For every token manager get the list of word-label pair as [[WORD: LABEL], [WORD2: LABEL]]
    for elem in TaggingTask.objects.all():
        if elem.judgment.id == judgment_id and elem.task.id == task_id:
            tm = elem.token_manager
            user = elem.user

            if tm != ' ' and tm != '':
                # increment flag
                flag = flag + 1

                # Double convertion to dict
                tm = json.loads(json.loads(tm))

                # Get only tokens
                tokens = tm['tokens']

                # list of word-label pair as [{WORD: LABEL}, {WORD2: LABEL}]
                words = []
                while tokens:
                    t = tokens.pop(0)

                    if isinstance(t, str):
                        words.append(tuple([t, None]))
                    elif t['type'] == "token":
                        words.append(tuple([t['text'], None]))
                    else:
                        label = t['label']

                        for child in t['tokens']:
                            # if child is token block, insert again in tokens
                            if child['type'] == 'token-block':
                                tokens.insert(0, child)
                                continue

                            single_token = child['text']

                            # insert directly the corrispondent value for every label/tag and token
                            words.append(
                                tuple([single_token, tags_value[label]]))

                # Insert data into the structure for agreement
                for pair in words:
                    #print('Pair: ', pair)
                    data['unit_id'].append(pair[0])
                    data['annotator_id'].append(str(user))
                    data['annotation'].append(pair[1])
            
    # return None if flag is < 2
    if flag < 2:
        return None

    # Calculate agreement with simpledorff package and pandas
    Data = pd.DataFrame(data)
    try:
        agreement = simpledorff.calculate_krippendorffs_alpha_for_df(Data, experiment_col='unit_id',
                                                                 annotator_col='annotator_id',
                                                                 class_col='annotation')
    except ZeroDivisionError:
        agreement = 1

    return agreement

# Receive the POST request to calculate the agreement score on a specific judgment


@login_required
def agreement_post(request, task_id, jud_id):
    current_user = request.user
    if not current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return redirect('tag_sentenze:my-tasks')

    if request.method == 'POST' and request.is_ajax:
        # Agreement value
        score = calc_agreement(task_id, jud_id,)
        print('Score: ', score)

        # Save score on the Database if it isn't None
        if score != None:
            score = round(score, 2)
            # judgment.score = score
            # judgment.save()
        else:
            score = '-'
      # print(score)

    return JsonResponse({'response': score}, status=200)


@login_required
def list_tasks_agreement(request):
    current_user = request.user
    tasks = Task.objects.annotate(n_docs=Count(
        'judgments', distinct=True), n_users=Count('users', distinct=True)).values()

    # admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'tasks': tasks
        }
        print(context)
        return render(request, 'users/list_tasks_agreement.html', context=context)
    # annotators don't
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')
    """
    # Create table in template with judgments as rows and users as columns

    """


@login_required
def list_taggings_agreement(request, id):
    current_user = request.user
    if not current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return redirect('tag_sentenze:my-tasks')

    task = Task.objects.get(id=id)
    judgments = task.judgments.all()
    users = task.users.all()

    rows = []

    # for every row there must be the judgment id, judgment name, agreement, status of judgment-user
    # Example: [JudgmentID, JudgmentName, Agreement, 1, 0] if first user has the judgment associated to, 0 otherwise
    # In Django template the first value (JudgmentID) must be skipped during the insertion loop into the table
    for judgment in judgments:
        single_row = []
        single_row.append(judgment.id)
        single_row.append(judgment.name)

        # Add agreement score from database
    #     agreement = judgment.score
    #   # print("Agreement judgment {}: {}".format(judgment.id, agreement))

    #     if agreement == None:
        single_row.append('-')
        # else:
        #     single_row.append(agreement)

        for user in users:
            if TaggingTask.objects.get(user=user, judgment=judgment, task=task).completed:
                single_row.append(2)
            else:
                single_row.append(1)

        rows.append(single_row)
  # print(rows)

    context = {
        'users': users,
        'judgments': judgments,
        'rows': rows,
        'task_id': id,
    }

    return render(request, 'users/list_taggings_agreement.html', context=context)


@login_required
def manage_users(request):
    #user = User.objects.all()
    user = User.objects.exclude(groups__name__in=["Admins", "Editors"])

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = UserRegisterForm()
        if request.method == 'POST':
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                # Add by default the new user to the Annotators Group
                annotators = Group.objects.get(name='Annotators')
                annotators.user_set.add(User.objects.get(username=username))
                return redirect('/')

        return render(request, 'users/manage_users.html', context={'form': form, 'users': user})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def update_user(request, id):
    user = User.objects.get(id=id)

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = UserRegisterForm(instance=user)
        if request.method == 'POST':
            form = UserRegisterForm(request.POST, instance=user)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                # Add by default the new user to the Annotators Group
                annotators = Group.objects.get(name='Annotators')
                annotators.user_set.add(User.objects.get(username=username))
                return redirect(reverse('users:manage-users'))

        return render(request, 'users/update_user.html', context={'form': form, 'users': user})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def delete_user(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            raise Http404()

        user.delete()
        messages.warning(request, ("User deleted"))
    else:
        messages.warning(request, ("You are not authorized"))

    return redirect(reverse('users:manage-users'))


@login_required
def manage_schemas(request):
    schemas = Schema.objects.all()

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return render(request, 'users/manage_schemas.html', context={'schemas': schemas})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def add_schemas(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
      # print("Admin/Editor access")
        if request.method == 'POST':
            # Get all the file uploaded
            schema_files = request.FILES.getlist('schemas')

            for schema in schema_files:
              # print(schema)
                new_schema = Schema.objects.create(
                    schema_file=schema,
                )
                new_schema.save()

            # redirect home
            return redirect(reverse('users:manage-schemas'))

        return render(request, 'users/add_schemas.html')
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')


@login_required
def delete_schema(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            schema = Schema.objects.get(id=id)
        except Schema.DoesNotExist:
            raise Http404()

        schema.delete()
        messages.warning(request, ("Schema deleted"))
    else:
        messages.warning(request, ("You are not authorized"))

    return redirect(reverse('users:manage-schemas'))


@login_required
def view_schema(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            schema = Schema.objects.get(id=id)
        except Schema.DoesNotExist:
            raise Http404()
        context = {'schema_text': schema.tags}
        return render(request, 'users/view_schema.html', context=context)
    else:
        return redirect(reverse('tag_sentenze:my-tasks'))


@login_required
def manage_juds(request):
    juds = Judgment.objects.all()

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return render(request, 'users/manage_juds.html', context={'juds': juds})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def add_judgments(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user

    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = AddJudgmentsForm()
      # print("Admin/Editor access")
        if request.method == 'POST':

            form = AddJudgmentsForm(request.POST)

            if form.is_valid():
                # Get all the file uploaded
                judgment_files = request.FILES.getlist('judgments')

                task = form.cleaned_data['task']

                for judgment in judgment_files:
                  # print(str(judgment))
                    new_judg = Judgment.objects.create(
                        judgment_file=judgment,
                    )
                    new_judg.save()

                    task.judgments.add(new_judg)

                    # auto assign the new uploaded judgments to all Users of this Task
                    for user in task.users.all():
                        assign_doc_to_user(task.id, new_judg.id, user.id)

                # redirect home
                return redirect(reverse('users:manage-juds'))

        # add the CoicheField with the schemas
        context = {
            'form': form,
        }

        return render(request, 'users/add_judgments.html', context=context)
    else:
      # print('Annotator access')
        return redirect('tag_sentenze:my-tasks')


@login_required
def delete_judgment(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            judgment = Judgment.objects.get(id=id)
        except Judgment.DoesNotExist:
            raise Http404()

        judgment.delete()
        messages.warning(request, ("Judgment deleted"))
    else:
        messages.warning(request, ("You are not authorized"))

    return redirect(reverse('users:manage-juds'))


@login_required
def view_judgment(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            jud = Judgment.objects.get(id=id)
        except Schema.DoesNotExist:
            raise Http404()
        context = {'jud_text': jud.initial_text.replace("<br/>", "\n")}
        return render(request, 'users/view_judgment.html', context=context)
    else:
        return redirect(reverse('tag_sentenze:my-tasks'))


@login_required
def manage_tasks(request):
    tasks = Task.objects.all()

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return render(request, 'users/manage_tasks.html', context={'tasks': tasks})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def new_task(request):
    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = TaskModelForm(initial={'owner': current_user})
        if request.method == 'POST':
            form = TaskModelForm(request.POST)
            if form.is_valid():
                task = form.save()

                # assign every Doc in the Task to every User in it
                for user in form.cleaned_data['users']:
                    for judgment in form.cleaned_data['judgments']:
                        assign_doc_to_user(task.id, judgment.id, user.id)

                return redirect(reverse('users:manage-tasks'))

        return render(request, 'users/create_task.html', context={'form': form})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def update_task(request, id):
    old_task = Task.objects.get(id=id)

    # check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        form = TaskModelForm(instance=old_task)
        if request.method == 'POST':
            form = TaskModelForm(request.POST, instance=old_task)
            if form.is_valid():
                # assignments obtained by analizing old and new pairs (user-doc)

                old_users = list(old_task.users.all())
                old_docs = list(old_task.judgments.all())
                old_pairs = [(user, doc)
                             for user in old_users for doc in old_docs]
                # print("old pairs:::   ", old_pairs)

                new_users = list(form.cleaned_data['users'])
                new_docs = list(form.cleaned_data['judgments'])
                new_pairs = [(user, doc)
                             for user in new_users for doc in new_docs]
                # print("new pairs:::   ", new_pairs)

                pairs_to_remove = [p for p in old_pairs if p not in new_pairs]
                # print("pairs to remove :::   ", pairs_to_remove)
                for (user, doc) in pairs_to_remove:
                    remove_doc_from_user(old_task.id, doc.id, user.id)

                pairs_to_add = [p for p in new_pairs if p not in old_pairs]
                # print("pairs to add :::   ", pairs_to_add)
                for (user, doc) in pairs_to_add:
                    assign_doc_to_user(old_task.id, doc.id, user.id)

                form.save()

                return redirect(reverse('users:manage-tasks'))

        return render(request, 'users/update_task.html', context={'form': form, 'tasks': old_task})

    else:
        return render(request, 'users/no_permission.html')


@login_required
def delete_task(request, id):
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        try:
            task = Task.objects.get(id=id)
        except Task.DoesNotExist:
            raise Http404()

        task.delete()
        messages.warning(request, ("Task deleted"))
    else:
        messages.warning(request, ("You are not authorized"))

    return redirect(reverse('users:manage-tasks'))


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

                # build xml string from file
                xml_string = b""
                f = request.FILES["xml_file"]
                for chunk in f.chunks():
                    xml_string += chunk

                # get the schema from the task
                task_id = form.data['task']
                task = Task.objects.get(id=task_id)
                print(task)
                schema = task.xsd

                # DO NOT validate xml-xsd... ACCEPT ALSO INVALID ONES

                # also we need to save the judgment (with original text)
                # add initial tag
                xml_string = xml_string.decode("utf-8").strip()
                if not xml_string.startswith("<sentag>"):
                    xml_string = "<sentag>" + xml_string + "</sentag>"

                # transformations to get the original text
                # remove the tags
                notags = re.sub('<.*?>', '', xml_string)
                # replace the \r\n with <br/>
                notags = " <br/> ".join(notags.splitlines())
                # remove multi space
                notags = " ".join(notags.split())
                # remove excessive \n
                notags = re.sub(r'(<br/> *){3,}', "<br/> <br/> ", notags)
                # remove leading <br/>
                if notags[:6] == "<br/> ":
                    notags = notags[6:]
                # print(notags)

                # save judgment without original text
                judgment = Judgment.objects.create(
                    judgment_file=request.FILES["xml_file"], initial_text=notags)

                # create tagging objects for the new doc-task (for each user in the task)
                for user in task.users.all():
                    assign_doc_to_user(
                        task.id, judgment.id, user.id, xml_string)  # also save the original xml text in the tagging

                # add the docs to the Task
                task.judgments.add(judgment)
                task.save()

                # TODO and then load the tagging interface
                # return redirect(reverse("tag_sentenze:tag-sentenza", kwargs={"id": tagging_id, "htbp": 1}))

                messages.success(
                    request, ("Annotated document added to the Task"))
                return redirect(reverse("users:parse-xml"))

        # either schema not valid or GET request -> re-display form
        context = {
            'form': form,
        }
        return render(request, 'tag_sentenze/parse_xml.html', context=context)
    else:  # no permission
        return redirect('tag_sentenze:my-tasks')
