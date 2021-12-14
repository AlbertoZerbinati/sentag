from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.contrib.auth.forms import UserCreationForm
from tag_sentenze.models import Judgment, Schema, Collection
from django_select2 import forms as s2forms

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']

class UserWidget(s2forms.ModelSelect2MultipleWidget):
    search_fields = [
        "user",
        "email",
    ]

class CollectionModelForm(ModelForm):
    name = forms.CharField(max_length=30)
    xsd = forms.ModelChoiceField(
        Schema.objects, help_text='Choose the schema to match the uploaded judgments', blank=False)
    owner = forms.ModelChoiceField(
        User.objects, help_text='Choose the owner', blank=False)

    class Meta:
        model = Collection
        fields = ['name', 'xsd', 'owner', 'users', 'judgments']
        widgets = {
            "user": UserWidget
        }
        #widgets = {'owner': forms.HiddenInput()}