from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404

from .models import Sentenza, Visualizer
from .forms import AddSentenzaModelForm, VisualizerModelForm


# Create your views here.
def index(request):
    context = {
        'num_sentenze': Sentenza.objects.all().count()
    }
    return render(request, 'tag_sentenze/index.html', context=context)

def list_sentenze(request):
    context = {
        'sentenze': Sentenza.objects.all()
    }
    return render(request, 'tag_sentenze/list_sentenze.html', context=context)

def new_sentenza(request):
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

def tag_sentenza(request, id):
    try:
        sentenza = Sentenza.objects.get(pk=id)
    except Sentenza.DoesNotExist:
        raise Http404("La sentenza non esiste")

    content = sentenza.sentenza.read().decode('utf-8')
    #print(content)
    visualizer = VisualizerModelForm(initial={'text': content})
    visualizer.disabled = True

    context = {
        'content_s': visualizer,
        'title_s'  : sentenza.sentenza,
    }
    return render(request, 'tag_sentenze/tag_sentenza.html', context=context)