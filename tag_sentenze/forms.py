from django import forms
from django.forms import ModelForm, Textarea
from .models import Sentenza


class AddSentenzaModelForm(ModelForm):
    class Meta:
        model = Sentenza
        fields = '__all__'
    
class VisualizerModelForm(forms.Form):

    text = forms.CharField(widget=Textarea(attrs={'rows':24, 'readonly':'readonly', 'id':'visualizer_area'}), label="")