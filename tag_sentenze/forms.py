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
    
    schema_choices = [(schema.id, schema.name) for schema in Schema.objects.all()]
    schema = forms.ChoiceField(choices=schema_choices, help_text='Choose the schema to match the uploaded judgments')

    class Meta:
        fields = ['schema']