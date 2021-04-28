from django import forms
from django.forms import ModelForm, Textarea
from .models import Sentenza

class AddSentenzaModelForm(ModelForm):
    class Meta:
        model = Sentenza
        fields = ['nome','sentenza','schema_xml']
