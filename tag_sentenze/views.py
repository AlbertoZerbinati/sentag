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



# APIs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TaggingSerializer
import json

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def tagging_detail(request, id):
    try:
        taggings = Tagging.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404()
    
    serializer = TaggingSerializer(taggings, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def update_tagging(request, id):
    try:
        taggings = Tagging.objects.get(pk=id)
    except Judgment.DoesNotExist:
        raise Http404()

    serializer = TaggingSerializer(instance=taggings, data={'token_manager':json.dumps(request.data)}, partial=True, many=False)
    if serializer.is_valid():
        #print("ISVALID")
        serializer.save();
    return HttpResponse("Updated")
