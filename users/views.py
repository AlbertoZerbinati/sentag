from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse

from django.contrib import messages

from .forms import UserRegisterForm
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