from django import forms
from django.forms import ModelForm, Textarea
from .models import Judgment, Schema
from django.db.utils import OperationalError


class AddJudgmentModelForm(ModelForm):
    def clean(self):
        cleaned_data = super(AddJudgmentModelForm, self).clean()

        if cleaned_data.get("name") == None:
            try:
                Judgment.objects.get(
                    name=cleaned_data.get("judgment_file").name)
            except Judgment.DoesNotExist:
                return cleaned_data

            raise forms.ValidationError(
                "This judgment's name has already been used and it must be unique")

        return cleaned_data

    class Meta:
        model = Judgment
        fields = ['name', 'judgment_file']


class AddSchemaForm(ModelForm):
    def clean(self):
        cleaned_data = super(AddSchemaForm, self).clean()

        if cleaned_data.get("name") == None:
            try:
                Schema.objects.get(name=cleaned_data.get("schema_file").name)
            except Schema.DoesNotExist:
                return cleaned_data

            raise forms.ValidationError(
                "This schema's name has already been used and it must be unique")

        return cleaned_data

    class Meta:
        model = Schema
        fields = ['name', 'schema_file']


class AddSchemaJudgmentsForm(forms.Form):

    schema = forms.ModelChoiceField(
        Schema.objects, help_text='Choose the schema to match the uploaded judgments', blank=False)

    class Meta:
        fields = ['schema']

class ParseXMLForm(forms.Form):
    xml_file = forms.FileField()
    xsd_file = forms.FileField(help_text='Upload a schema', required=False)

    schema = forms.ModelChoiceField(
        Schema.objects, help_text='Alternatively choose a Schema from the database', required=False)

    def clean(self):
        cleaned_data = super(ParseXMLForm, self).clean()
        xml_file = cleaned_data.get("xml_file")
        xsd_file = cleaned_data.get("xsd_file")
        schema = cleaned_data.get("schema")

        if xsd_file and schema:  # both were entered
            raise forms.ValidationError(
                "Either upload a new XSD file or select an existing schema, not both!")
        elif not xsd_file and not schema:  # neither were entered
            raise forms.ValidationError(
                "You must either upload a new XSD file or select an existing schema")

        if xml_file:
            if Judgment.objects.filter(name=xml_file.name).exists():
                raise forms.ValidationError(
                    "This judgment's name has already been used and it must be unique")

        if xsd_file:
            if Schema.objects.filter(name=xsd_file.name).exists():
                raise forms.ValidationError(
                    "This schema's name has already been used and it must be unique")

        return cleaned_data
