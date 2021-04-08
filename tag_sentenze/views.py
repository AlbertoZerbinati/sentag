from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404

from .models import Sentenza
from .forms import AddSentenzaModelForm, VisualizerModelForm

import xml.etree.ElementTree as et


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

    #create tag list
    xml_file = sentenza.xml_schema.read().decode('utf-8')

    #add a root tag at the begginning and the end of the xml file
    xml_file = '<ROOT>' + xml_file
    xml_file = xml_file + '</ROOT>'

    xml_tree = et.fromstring(xml_file)
    tag_list = []
    for elem in xml_tree.iter():
        if elem.tag not in tag_list:
            tag_list.append(elem.tag)

    tag_list.remove('ROOT')

    print(tag_list)
    
    visualizer = VisualizerModelForm(initial={'text': content})
    visualizer.disabled = True

    context = {
        'content_s': visualizer,
        'nome_s'  : sentenza.nome,
        'tag_schema': tag_list,
    }
    return render(request, 'tag_sentenze/tag_sentenza.html', context=context)