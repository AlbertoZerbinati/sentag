from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse

from django.contrib import messages

from .forms import UserRegisterForm
from tag_sentenze.models import Sentenza

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
            'sentenze': Sentenza.objects.all()
        }

        return render(request, 'users/editor_page.html', context=context)
    else:
        return render(request, 'users/no_permission.html')

@login_required
def user_permission(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        raise Http404("The selected user doesn't exist")

    #contains a list of all the sentenze the selected user has access to
    permission_list = user.profile.permission.all()

    #contains the rest of the sentenze (all sentenze - selected user sentenze)
    all_sentenze = Sentenza.objects.all()
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
    sentenze = Sentenza.objects.values_list('nome', flat=True)
    #print(sentenze)

    #add a new sentenza to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenza = Sentenza.objects.get(nome=data['sentenza'])

    permission_list = selected_user.profile.permission.all()
    if selected_sentenza not in permission_list:
        selected_user.profile.permission.add(selected_sentenza)

    print(selected_user.profile.permission.all())

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
    selected_sentenza = Sentenza.objects.get(nome=data['sentenza'])

    permission_list = selected_user.profile.permission.all()
    if selected_sentenza in permission_list:
        selected_user.profile.permission.remove(selected_sentenza)

    print(selected_user.profile.permission.all())

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
    sentenze = Sentenza.objects.values_list('nome', flat=True)
    #print(sentenze)

    #add a new list of sentenze to the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
    print(selected_sentenze)

    permission_list = selected_user.profile.permission.all()

    for elem in selected_sentenze:
        tmp_sentenza = Sentenza.objects.get(nome=elem)
        print(tmp_sentenza.id)
        if tmp_sentenza not in permission_list:
            selected_user.profile.permission.add(tmp_sentenza)

    print(selected_user.profile.permission.all())

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
    sentenze = Sentenza.objects.values_list('nome', flat=True)
    #print(sentenze)

    #remove a list of sentenze from the permission of the selected user
    selected_user = User.objects.get(username=data['user'])
    selected_sentenze = json.loads(data['sentenze'])
    print(selected_sentenze)

    permission_list = selected_user.profile.permission.all()

    for elem in selected_sentenze:
        tmp_sentenza = Sentenza.objects.get(nome=elem)
        print(tmp_sentenza.id)
        if tmp_sentenza in permission_list:
            selected_user.profile.permission.remove(tmp_sentenza)

    print(selected_user.profile.permission.all())

    selected_user.save()

    return JsonResponse({'response': data}, status=200)