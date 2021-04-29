from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from .models import Sentenza
from .forms import AddSentenzaModelForm, VisualizerModelForm

from django.contrib.auth.decorators import login_required

import xml.etree.ElementTree as et


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

def new_tag(request, nome):

    data = {}

    if request.method == 'POST' and request.is_ajax:
        data['tag'] = request.POST.get('tag')
        data['start'] = request.POST.get('start_text')
        data['end'] = request.POST.get('end_text')

    print(data)

    return JsonResponse({'response': data}, status=200)