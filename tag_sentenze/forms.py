from django import forms
from django.forms import ModelForm
from .models import Sentenza


class AddSentenzaModelForm(ModelForm):
    class Meta:
        model = Sentenza
        fields = '__all__'