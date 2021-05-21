from django import forms
from django.forms import ModelForm, Textarea
from .models import Judgment

class AddJudgmentModelForm(ModelForm):
    class Meta:
        model = Judgment
        fields = ['name','judgment_file']
