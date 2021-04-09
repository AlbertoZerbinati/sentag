from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from .models import Sentenza
from .forms import AddSentenzaModelForm, VisualizerForm

import re

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
        else:
            return render(request, 'tag_sentenze/new_sentenza.html', context={'form':form})

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

    content = sentenza.output_xml
    visualizer = VisualizerForm(initial={'text': content})
    tags = ["dummy tag"]

    context = {
        'content_s' : visualizer,
        'nome_s'    : sentenza.nome,
        'tags'      : tags
    }
    return render(request, 'tag_sentenze/tag_sentenza.html', context=context)

def new_tag(request, nome):
    if request.method == 'POST':
        tag = request.POST.get('tag')
        non_tagged_text = request.POST.get('non_tagged_text')

        sentenza = Sentenza.objects.get(nome=nome)
        old_xml = sentenza.output_xml

        #PROBLEMA: NON E' UN TAG xml MA html
        tagged_text = "<" + "_".join(tag.split()) + ">" + non_tagged_text + "</" + "_".join(tag.split()) + ">"
        # print("non tagged:")
        # print(repr(non_tagged_text))
        # print()
        # print("tagged:")
        # print(repr(tagged_text))
        
        #PROBLEMA: REPLACE DELLA PRIMA OCCORRENZA...
        new_xml = old_xml.replace(non_tagged_text, tagged_text, 1)
        # print()
        # print("old_xml:")
        # print(repr(old_xml))

        # print()
        # print("new_xml:")
        # print(repr(new_xml))
        
        sentenza.output_xml = new_xml
        sentenza.save()

        return JsonResponse({'response': new_xml}, status=200)
