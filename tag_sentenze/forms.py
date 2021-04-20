from django import forms
from django.forms import ModelForm, Textarea
from .models import Sentenza

class AddSentenzaModelForm(ModelForm):
    class Meta:
        model = Sentenza
        fields = '__all__'
        widgets = { 'output_xml': forms.HiddenInput(), 
                    'initial_text': forms.HiddenInput(),
                    'completed': forms.HiddenInput()
                  }

class VisualizerForm(forms.Form):
    text = forms.CharField(widget=Textarea(attrs={'readonly':'readonly', 'id':'visualizer_area'}), label="")