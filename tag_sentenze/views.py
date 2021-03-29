from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404

from .models import Sentenza
from .forms import AddSentenzaModelForm, VisualizerForm


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
    #print(content)
    visualizer = VisualizerForm(initial={'text': content})
    visualizer.fields['text'].disabled = True

    tags = ["dummy tag"]

    context = {
        'content_s' : content,
        'title_s'   : sentenza.nome,
        'tags'      : tags
    }
    return render(request, 'tag_sentenze/tag_sentenza.html', context=context)


"""
update object in DB from ajax-js POST-call 

params: (nome, tag, tagged_text)

sentenza = Sentenza.object.filter(nome=nome)
old_xml = sentenza.output_xml

non_tagged_text = tagged_text.removeprefix("<"+tag+">").removesuffix("<"+tag+">")
new_xml = old_xml.replace(non_tagged_text, tagged_text)

sentenza.output_xml = new_xml
"""