from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse

from django.contrib import messages

from .forms import UserRegisterForm
from .models import Tagging, Profile
from tag_sentenze.models import Judgment, Schema

from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required

import json

# Create your views here.
@login_required
def register(request):

    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        if request.method == 'POST':
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                #Add by default the new user to the Taggatori Group
                taggatori = Group.objects.get(name='Taggatori')
                taggatori.user_set.add(User.objects.get(username=username))
                return redirect('/')
        else:
            form = UserRegisterForm()

        return render(request, 'users/register.html', context= {'form': form})

    else:
        return render(request, 'users/no_permission.html')

@login_required
def editor_page(request):

    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        #get all users from Taggatori group
        taggers = User.objects.filter(groups__name='Taggatori').all()
        print(taggers)

        context = {
            'lista_users': taggers,
            'sentenze': Judgment.objects.all()
        }

        return render(request, 'users/editor_page.html', context=context)
    else:
        return render(request, 'users/no_permission.html')

@login_required
def home_permission(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        #get all users from Taggatori group
        taggers = User.objects.filter(groups__name='Taggatori').all()
        print(taggers)

        context = {
            'lista_users': taggers,
            'sentenze': Judgment.objects.all()
        }

        return render(request, 'users/home_permission.html', context=context)
    else:
        return redirect('/sentenze/')

@login_required
def user_permission(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        raise Http404("The selected user doesn't exist")

    #contains a list of all the sentenze the selected user has access to
    permission_list = user.profile.taggings.all()

    #contains the rest of the sentenze (all sentenze - selected user sentenze)
    all_sentenze = Judgment.objects.all()
    for elem in all_sentenze:
        if elem in permission_list:
            all_sentenze = all_sentenze.exclude(pk=elem.id)

    context = {
        'permission': permission_list,
        'selected_user': user,
        'lista_users': User.objects.filter(groups__name='Taggatori').all(),
        'sentenze': all_sentenze
    }
    
    return render(request, 'users/permission_page.html', context=context)

@login_required
def add_permission(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenza'] = request.POST.get('selected_sentenza')

    #print(data)

    #get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    #print(sentenze)

    #add a new sentenza to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    permission_list = selected_user.profile.taggings.all()
    if selected_sentenza not in permission_list:
        selected_user.profile.taggings.add(selected_sentenza)

    print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)
    #return user_permission(request, selected_user.id)

@login_required
def remove_permission(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenza'] = request.POST.get('selected_sentenza')

    print(data)

    #remove the selected sentenza to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenza = Judgment.objects.get(id=data['sentenza'])

    permission_list = selected_user.profile.taggings.all()
    if selected_sentenza in permission_list:
        selected_user.profile.taggings.remove(selected_sentenza)

    print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)

@login_required
def add_permission_list(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenze'] = request.POST.get('selected_sentenze')

    print(data)

    #get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    #print(sentenze)

    #add a new list of sentenze to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
    print(selected_sentenze)

    permission_list = selected_user.profile.taggings.all()

    for elem in selected_sentenze:
        tmp_sentenza = Judgment.objects.get(id=elem)
        print(tmp_sentenza.id)
        if tmp_sentenza not in permission_list:
            selected_user.profile.taggings.add(tmp_sentenza)

    print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)

@login_required
def remove_permission_list(request, utente):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['user'] = request.POST.get('selected_user')
        data['sentenze'] = request.POST.get('selected_sentenze')

    print(data)

    #get all the sentenze
    sentenze = Judgment.objects.values_list('id', flat=True)
    #print(sentenze)

    #remove a list of sentenze from the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
    print(selected_sentenze)

    permission_list = selected_user.profile.taggings.all()

    for elem in selected_sentenze:
        tmp_sentenza = Judgment.objects.get(id=elem)
        print(tmp_sentenza.id)
        if tmp_sentenza in permission_list:
            selected_user.profile.taggings.remove(tmp_sentenza)

    print(selected_user.profile.taggings.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)

@login_required
def home_judgment_schema(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        #get all users from Taggatori group
        schemas = Schema.objects.all()
        print(schemas)

        context = {
            'lista_schemas': schemas,
            'sentenze': Judgment.objects.all()
        }

        return render(request, 'users/home_sentenza_schema.html', context=context)
    else:
        return redirect('/sentenze/')

@login_required
def join_schema(request, id):
    try:
        schema = Schema.objects.get(pk=id)
    except User.DoesNotExist:
        #raise Http404("The selected user doesn't exist")
        schema = Schema.objects.get(pk=1)

    #contains a list of all the sentenze related to the current selected schema
    sentenze_list = Judgment.objects.filter(xsd=schema)

    all_judgments = Judgment.objects.all()

    #contains the rest of the sentenze (all sentenze - selected user sentenze)
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

    print(data)

    #add the schema to the selected judgment
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

    print(data)

    #remove the schema to the selected judgment
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

    #add a schema to a list of selected judgments
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

    #add a schema to a list of selected judgments
    selected_schema = Schema.objects.get(id=data['schema'])
    selected_sentenze = json.loads(data['sentenze'])

    for sentenza in selected_sentenze:
        sel_sent = Judgment.objects.get(id=sentenza)
        sel_sent.xsd = None
        sel_sent.save()

    return JsonResponse({'response': data}, status=200)

import simpledorff
import pandas as pd
from lxml import etree

#Agreement code
def calc_agreement(judgment_id):
    
    #print('------------------ CALCOLO AGREEMENT -------------------')

    #Creation of a list with all judgment tokens
    judgment = Judgment.objects.get(id=judgment_id)
    judgment_text = judgment.initial_text
    judgment_tokens = judgment_text.split(' ')
    #print(judgment_tokens)

    #dictionary with token-value pairs
    tokens_value = {}

    #assign a integer value to every judgment's token
    for i in range(len(judgment_tokens)):
        tokens_value[judgment_tokens[i]] = i+1
    #print(tokens_value)

    #Get the schema associated to the Judgment and create dictionary with all the tags
    schema = judgment.xsd.schema_file

    tree = etree.ElementTree(file=schema)
    tags = tree.xpath("//xsd:element/@name", namespaces={"xsd": "http://www.w3.org/2001/XMLSchema"})
    #print(tags)

    tags_value = {}

    for i in range(len(tags)):
        tags_value[tags[i]] = i+1

    #Data structure for calculate the agreement
    data = {'unit_id': [],
		    'annotator_id': [],
		    'annotation': []}

    #list of all token managers for the selected judgments
    #tm_list = []

    #flag to see if at least two or more users has a token manager not empty
    flag = 0

    #For every token manager get the list of word-label pair as [[WORD: LABEL], [WORD2: LABEL]]
    for elem in Tagging.objects.all():
        #print(elem)
        if(elem.judgment.id == judgment_id):
            #print('Trovato profile {} con judgment id {}'.format(elem.profile, elem.judgment.id))
            tm = elem.token_manager
            user = elem.profile
            #print(user)

            if tm != ' ' and tm != '':
                #increment flag
                flag = flag + 1

                #Double convertion to dict
                tm = json.loads(tm)
                tm = json.loads(tm)

                #Get only tokens
                tokens = tm['tokens']

                #list of word-label pair as [{WORD: LABEL}, {WORD2: LABEL}]
                words = []
                while tokens:
                    t = tokens.pop(0)
                    #print(t)

                    if isinstance(t, str):
                        words.append(tuple([t, None]))
                    elif 'text' in t:
                        words.append(tuple([t['text'], None]))
                    else:
                        label = t['label']
                        
                        for child in t['tokens']:
                            #words.append({child['text']: label})

                            #if child is token block, insert again in tokens
                            if child['type'] == 'token-block':
                                tokens.insert(0, child)
                                continue

                            single_token = child['text']

                            #insert directly the corrispondent value for every label/tag and token
                            words.append(tuple([single_token, tags_value[label]]))
                            #if label != None:
                            #    words.append(tuple([single_token, tags_value[label]]))
                            #else:
                            #    print('Label None')
                            #    words.append(tuple([single_token, None]))

                #print('Words: ', words)

                #Insert data into the structure for agreement
                for pair in words:
                    #print('Pair: ', pair)
                    data['unit_id'].append(pair[0])
                    data['annotator_id'].append(str(user))
                    data['annotation'].append(pair[1])

    #print('Secondo token Manager: ', tm_list[1])
    #print('Type: ', type(tm_list[1]))
    #sample_tk = json.loads(tm_list[1])
    #print(sample_tk)
    #print('Type: ', type(sample_tk))

    #sample_tk = json.loads(sample_tk)
    #print(sample_tk)
    #print('Type: ', type(sample_tk))
    
    #tokens = sample_tk['tokens']
    #print('Tokens: ', tokens)
    #print(type(tokens))

    #list of word-label pair as [{WORD: LABEL}, {WORD2: LABEL}]
    #words = []
    #while tokens:
    #    t = tokens.pop(0)
    #    print(t)

    #    if isinstance(t, str):
    #        words.append({t: None})
    #    elif 'text' in t:
    #        words.append({t['text']: None})
    #    else:
    #        label = t['label']
    #        
    #        for child in t['tokens']:
    #            words.append({child['text']: label})

    #print(words)

    #print('Data: ', data)

    #return None if flag is < 2
    if flag < 2:
        return None

    #Calculate agreement with simpledorff package and pandas
    Data = pd.DataFrame(data)
    agreement = simpledorff.calculate_krippendorffs_alpha_for_df(Data,experiment_col='unit_id',
                                                 annotator_col='annotator_id',
                                                 class_col='annotation')

    #print('Agreement Judgment {}: {}'.format(judgment_id, agreement))

    #print(Data.iloc[:100])

    return agreement


@login_required
def agreement_page(request):

    #Create table in template with judgments as rows and users as columns
    users = User.objects.filter(groups__name='Taggatori').all()
    judgments = Judgment.objects.all()

    rows = []

    #for every row there must be the judgment name, agreement, status of judgment-user
    #Example: [JudgmentName, Agreement, 1, 0] if first user has the judgment associated to, 0 otherwise
    for judgment in judgments:
        single_row = []
        single_row.append(judgment.name)

        #Add agreement rate
        agreement = calc_agreement(judgment.id)
        print("Agreement judgment {}: {}".format(judgment.id, agreement))
        
        if agreement == None:
            single_row.append('')
        else:
            single_row.append(agreement)

        for user in users:
            user_judgments = user.profile.taggings.all()
            #print('Sentenze utente: ', user_judgments)
            if judgment in user_judgments:
                if Tagging.objects.get(profile=Profile.objects.get(user=user), judgment=judgment).completed:
                    single_row.append(2)
                else:
                    single_row.append(1)
            else:
                single_row.append(0)
        
        rows.append(single_row)
    print(rows)

    context = {
        'users': users,
        'judgments': judgments,
        'rows': rows
    }

    return render(request, 'users/agreement_page.html', context=context)