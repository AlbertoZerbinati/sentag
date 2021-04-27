from django.shortcuts import render, redirect

from django.contrib import messages

from .forms import UserRegisterForm
from tag_sentenze.models import Sentenza

from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

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
                messages.success(request, f'Account created for {username}. You can now log in')
                return redirect('/')
        else:
            form = UserRegisterForm()

        return render(request, 'users/register.html', context= {'form': form})

    else:
        return render(request, 'users/no_permission.html')

def editor_page(request):
    #get all users from Taggatori group
    taggers = User.objects.filter(groups__name='Taggatori').all()
    print(taggers)

    context = {
        'lista_users': taggers,
        'sentenze': Sentenza.objects.all()
    }

    return render(request, 'users/editor_page.html', context=context)