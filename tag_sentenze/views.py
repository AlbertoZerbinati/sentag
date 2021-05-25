from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from .models import Judgment
from .forms import AddJudgmentModelForm
from users.models import Tagging, Profile
from django.contrib.auth.decorators import login_required

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
        sentenze_user = current_user.profile.taggings.all()
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
        raise Http404()

    current_user = request.user
    profile = Profile.objects.get(user=request.user)
    user_taggings = current_user.profile.taggings.all()

    #admins and editors have access to all the sentenze
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        print("Admin/Editor access")
        #retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings':Tagging.objects.filter(profile=profile, judgment=sentenza)[0]
        }
        print("---->",context['taggings'].id)
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    #taggatori has access only to their set of sentenze
    elif sentenza in user_taggings:
        print('Taggatore access with permission')
        #retrive the taging table starting using profile and judgment as unique identifiers
        context = {
            'taggings':Tagging.objects.filter(profile=profile, judgment=sentenza)[0]
        }
        return render(request, 'tag_sentenze/tag_sentenza.html', context=context)
    else:
        print('Taggatori access with no permission')
        return render(request, 'tag_sentenze/no_taggings.html')

@login_required
def download(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404()

    current_user = request.user
    if not current_user.groups.filter(name__in=['Editors', 'Admins']).exists():
        return redirect('/')

    #load token manager: again I need double loads, in Vue I need double parse instead...
    tm = json.loads(json.loads(tagging.token_manager))
    # print(type(tm))

    #now I need to build the xml string

    #list of tokens (and token-blocks)
    words=[] #stack for words: <tags> + tokens
    s = tm['tokens']
    # print(s)
    # print("\n")
    while s:
        #extract first token
        t = s.pop(0)
        # print(t)
        # print(t.items())
        # print()
        #check if it is a token
        if isinstance(t, str):
            words.append(t)
            # print(words)
            # print(s)
            # print()
            # print(words)
            # print()
        elif 'text' in t:
            # print('sono un TOKEN!',t['text'])
            words.append(t['text'])
        else: #else it is a token-block so we push to the stack his 'tokens' and print the label into the xml
            label = t['label']
            start_tag = '<' + str(label)
            for k,v in t['attrs'].items():
                start_tag = start_tag + f' {k}="{v}"'
            start_tag = start_tag + '>'
            end_tag = '</' + str(label) + '>'
            # print('sono un TOKEN-BLOCK!', start_tag)
            words.append(start_tag)
            s.insert(0,end_tag)
            for child in reversed(t['tokens']):
                s.insert(0,child)

    #!!! MANCA INCIPIT XML !!!
    xml_string = ' '.join(words)
    xml_string = """<body>\n""" + xml_string + """\n</body>"""
    # print(xml_string)
    response = {'name':tagging.judgment.name[:tagging.judgment.name.rfind(".")], 'xml':xml_string}
    return JsonResponse(response)


@login_required
def list_taggings(request):    
    current_user = request.user
    taggings = Tagging.objects.all()

    #admins and editors have access to all taggings
    if current_user.groups.filter(name__in=['Editors', 'Admins']).exists():   
        context = {
            'taggings': taggings
        }
        return render(request, 'tag_sentenze/list_taggings.html', context=context)
    #taggatori don't
    else:
        print('Taggatore access')
        return redirect('sentenze')


# APIs
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TaggingSerializer

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def tagging_detail(request, id):
    print(id)
    try:
        tagging = Tagging.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404()
    
    serializer = TaggingSerializer(tagging, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def update_tagging(request, id):
    try:
        tagging = Tagging.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404()

    token_manager = json.dumps(request.data['tm'])
    completed = request.data['cp']

    serializer = TaggingSerializer(instance=tagging, data={'token_manager':token_manager, 'completed':completed}, partial=True, many=False)
    if serializer.is_valid():
        #print("ISVALID")
        serializer.save();
    return HttpResponse("Updated")
