from django import forms
from django.forms import ModelForm, Textarea
from .models import Sentenza, Visualizer


class AddSentenzaModelForm(ModelForm):
    class Meta:
        model = Sentenza
        fields = '__all__'
    
class VisualizerModelForm(ModelForm):
    class Meta:
        model = Visualizer
        fields = ('text',)
        labels = {
            'text' : ('')
        }
        widgets = {
            'text': Textarea(attrs={'cols': 80, 'rows': 25, 'disabled':True}),
        }