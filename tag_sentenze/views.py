from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from .models import Sentenza
from .forms import AddSentenzaModelForm

from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def index(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        context = {
            'num_sentenze': Sentenza.objects.all().count()
        }
        return render(request, 'tag_sentenze/index.html', context=context)
    else:
        return redirect('/sentenze/')

@login_required
def list_sentenze(request):
    context = {
        'sentenze': Sentenza.objects.all()
    }
    return render(request, 'tag_sentenze/list_sentenze.html', context=context)

@login_required
def new_sentenza(request):
    #check if current user belongs to Editor or Admin Group
    current_user = request.user
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        if request.method == 'POST':
            # Create a form instance and populate it with data from the request 
            form = AddSentenzaModelForm(request.POST, request.FILES)
            # Check if the form is valid:
            if form.is_valid():
                # save the form into the DB
                form.save()

                # redirect home
                return HttpResponseRedirect(reverse('tag_sentenze:index') )

        form = AddSentenzaModelForm()
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
        sentenza = Sentenza.objects.get(pk=id)
    except Sentenza.DoesNotExist:
        raise Http404("La sentenza non esiste")

    context = {
        'nome_s':sentenza.nome,
    }
    return render(request, 'tag_sentenze/tag_sentenza.html', context=context)

# APIs
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SentenzaSerializer

@login_required
@api_view(['GET'])
def sentenza_detail(request, id):
    try:
        sentenza = Sentenza.objects.get(pk=id)
    except Sentenza.DoesNotExist:
        raise Http404("La sentenza non esiste")
    
    serializer = SentenzaSerializer(sentenza, many=False)
    return Response(serializer.data)

@api_view(['POST','GET'])
def update_sentenza(request, id):
    #print(request.method)
    if request.method == 'GET':
        return redirect('/sentenze/')

    try:
        sentenza = Sentenza.objects.get(pk=id)
    except Sentenza.DoesNotExist:
        raise Http404("La sentenza non esiste")

    serializer = SentenzaSerializer(instance=sentenza, data={'token_manager':str(request.data).replace("\'",'\"').replace("None","null")}, partial=True, many=False)
    if serializer.is_valid():
        #print("ISVALID")
        serializer.save();
    return HttpResponse("Updated")
