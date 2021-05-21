from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from .models import Judgment
from .forms import AddJudgmentModelForm

import json

from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def index(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'num_sentenze': Judgment.objects.all().count()
        }
        return render(request, 'tag_sentenze/index.html', context=context)
    else:
        return redirect('/sentenze/')

@login_required
def list_sentenze(request):
    
    current_user = request.user
    sentenze = Judgment.objects.all()

    #admins and editors has access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():   
        context = {
            'sentenze': sentenze
        }
        return render(request, 'tag_sentenze/list_sentenze.html', context=context)
    #taggatori has access only to their set of sentenze, so they will see a list of this set
    else:
        sentenze_user = current_user.profile.permission.all()
        print('Current user: ', current_user)
        print('Permission: ', sentenze_user)
        return render(request, 'tag_sentenze/list_sentenze.html', {'sentenze': sentenze_user})

@login_required
def new_sentenza(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        if request.method == 'POST':
            # Create a form instance and populate it with data from the request 
            form = AddJudgmentModelForm(request.POST, request.FILES)
            # Check if the form is valid:
            if form.is_valid():
                # save the form into the DB
                form.save()

                # redirect home
                return HttpResponseRedirect(reverse('tag_sentenze:index') )

        form = AddJudgmentModelForm()
        context = {
            'form': form,
        }
        return render(request, 'tag_sentenze/new_sentenza.html', context=context)
    else:
        print('Taggatore access')
        return redirect('/sentenze/')

@login_required
def tag_sentenza(request, id):
    try:
        sentenza = Judgment.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404("La sentenza non esiste")

    current_user = request.user
    user_permission = current_user.profile.permission.all()

    #admins and editors has access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")

        context = {
            'nome_s':sentenza.name,
        }
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    #taggatori has access only to their set of sentenze
    elif sentenza in user_permission:
        print('Taggatore access with permission')

        context = {
            'nome_s':sentenza.name,
        }
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    else:
        print('Taggatori access with no permission')
        return render(request, 'tag_sentenze/no_permission.html')



# APIs
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import JudgmentSerializer

@login_required
@api_view(['GET'])
def sentenza_detail(request, id):
    try:
        sentenza = Judgment.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404("La sentenza non esiste")
    
    serializer = JudgmentSerializer(sentenza, many=False)
    return Response(serializer.data)

@api_view(['POST','GET'])
def update_sentenza(request, id):
    #print(request.method)
    if request.method == 'GET':
        return redirect('/sentenze/')

    try:
        sentenza = Judgment.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404("La sentenza non esiste")

    serializer = JudgmentSerializer(instance=sentenza, data={'token_manager':json.dumps(request.data)}, partial=True, many=False)
    if serializer.is_valid():
        #print("ISVALID")
        serializer.save();
    return HttpResponse("Updated")
