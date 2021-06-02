from django import forms
from django.forms import ModelForm, Textarea
from .models import Judgment, Schema

class AddJudgmentModelForm(ModelForm):
    class Meta:
        model = Judgment
        fields = ['name','judgment_file', 'xsd']

class AddSchemaForm(ModelForm):
    class Meta:
        model = Schema
        fields = ['name', 'schema_file']

class AddSchemaJudgmentsForm(forms.Form):
    
    schema = forms.ModelChoiceField(Schema.objects, help_text='Choose the schema to match the uploaded judgments', blank=False)

    class Meta:
        fields = ['schema']