from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.contrib.auth.forms import UserCreationForm
from tag_sentenze.models import Judgment, Schema, Task
from django_select2 import forms as s2forms


class MyTaskModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return f"{obj}   (using {obj.xsd})"


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name',
                  'email', 'password1', 'password2']


class UserWidget(s2forms.ModelSelect2MultipleWidget):
    search_fields = [
        "user",
        "email",
    ]


class AddJudgmentsForm(forms.Form):
    task = MyTaskModelChoiceField(
        Task.objects, help_text='The Task for these docs', blank=False)

    class Meta:
        fields = ['task']


# class AddSchemaForm(ModelForm):
#     def clean(self):
#         cleaned_data = super(AddSchemaForm, self).clean()

#         if cleaned_data.get("name") == None:
#             try:
#                 Schema.objects.get(name=cleaned_data.get("schema_file").name)
#             except Schema.DoesNotExist:
#                 return cleaned_data

#             raise forms.ValidationError(
#                 "This schema's name has already been used and it must be unique")

#         return cleaned_data

#     class Meta:
#         model = Schema
#         fields = ['name', 'schema_file']


class TaskModelForm(ModelForm):
    name = forms.CharField(max_length=30)
    xsd = forms.ModelChoiceField(
        Schema.objects, help_text='Choose the schema to match the new Task', blank=False)
    owner = forms.ModelChoiceField(
        User.objects, help_text='Choose the owner', blank=False)

    class Meta:
        model = Task
        fields = ['name', 'xsd', 'owner', 'users', 'judgments']
        # widgets = {
        #     "user": UserWidget
        # }
        # widgets = {'owner': forms.HiddenInput()}


class ParseXMLForm(forms.Form):
    xml_file = forms.FileField()
    task = MyTaskModelChoiceField(
        Task.objects, help_text='The Task for the new doc', blank=False)

    # xsd_file = forms.FileField(help_text='Upload a schema', required=False)

    # schema = forms.ModelChoiceField(
    #     Schema.objects, help_text='Alternatively choose a Schema from the database', required=False)
    def clean(self):
        cleaned_data = super(ParseXMLForm, self).clean()
        xml_file = cleaned_data.get("xml_file")
        if xml_file:
            if Judgment.objects.filter(name=xml_file.name).exists():
                raise forms.ValidationError(
                    "This judgment's name has already been used and it must be unique")

        # xsd_file = cleaned_data.get("xsd_file")
        # schema = cleaned_data.get("schema")

        # if xsd_file and schema:  # both were entered
        #     raise forms.ValidationError(
        #         "Either upload a new XSD file or select an existing schema, not both!")
        # elif not xsd_file and not schema:  # neither were entered
        #     raise forms.ValidationError(
        #         "You must either upload a new XSD file or select an existing schema")
        # if xsd_file:
        #     if Schema.objects.filter(name=xsd_file.name).exists():
        #         raise forms.ValidationError(
        #             "This schema's name has already been used and it must be unique")

        return cleaned_data
