from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from django.contrib.admin.widgets import FilteredSelectMultiple 
from django.utils.text import format_lazy

from tag_sentenze.models import Judgment
from users.models import Profile, Tagging #, UserTasks#, UserTasksSynonyms

class PermissionInline(admin.StackedInline):
    model = Profile
    can_delete = True
    verbose_name_plural = 'profile'

    #display a nice horizontal filter in admin User page
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        db = kwargs.get('using')

        if db_field.name == 'taggings':
            kwargs['widget'] = FilteredSelectMultiple(db_field.verbose_name, is_stacked=False)
        else:
            return super().formfield_for_manytomany(db_field, request, **kwargs)

        if 'queryset' not in kwargs:
            queryset = Judgment.objects.all()
            if queryset is not None:
                kwargs['queryset'] = queryset
        form_field = db_field.formfield(**kwargs)
        msg = 'Judgments this User can TAG. Hold down “Control”, or “Command” on a Mac, to select more than one.'
        help_text = form_field.help_text
        form_field.help_text = (
            format_lazy('{} {}', help_text, msg) if help_text else msg
        )
        return form_field

class UserAdmin(BaseUserAdmin):
    inlines = (PermissionInline,)

class ProfileAdmin(admin.ModelAdmin):
    #display a nice horizontal filter in admin Profile page
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        db = kwargs.get('using')

        if db_field.name == 'taggings':
            kwargs['widget'] = FilteredSelectMultiple(db_field.verbose_name, is_stacked=False)
        else:
            return super().formfield_for_manytomany(db_field, request, **kwargs)

        if 'queryset' not in kwargs:
            queryset = Judgment.objects.all()
            if queryset is not None:
                kwargs['queryset'] = queryset
        form_field = db_field.formfield(**kwargs)
        msg = 'Judgments this Profile can TAG. Hold down “Control”, or “Command” on a Mac, to select more than one.'
        help_text = form_field.help_text
        form_field.help_text = (
            format_lazy('{} {}', help_text, msg) if help_text else msg
        )
        return form_field

class UserTasksSynonymsAdmin(admin.ModelAdmin):
    filter_horizontal = ['user']
    '''#display a nice horizontal filter in admin UserTasksSynonyms page
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        db = kwargs.get('using')

        if db_field.name == 'user':
            kwargs['widget'] = FilteredSelectMultiple(db_field.verbose_name, is_stacked=False)
        else:
            return super().formfield_for_manytomany(db_field, request, **kwargs)

        if 'queryset' not in kwargs:
            queryset = User.objects.all()
            if queryset is not None:
                kwargs['queryset'] = queryset
        form_field = db_field.formfield(**kwargs)
        msg = 'User this Profile can TAG. Hold down “Control”, or “Command” on a Mac, to select more than one.'
        help_text = form_field.help_text
        form_field.help_text = (
            format_lazy('{} {}', help_text, msg) if help_text else msg
        )
        return form_field'''

#register models with nice widgets
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Tagging)
#admin.site.register(UserTasks, UserTasksSynonymsAdmin)
#admin.site.register(UserTasksSynonyms, UserTasksSynonymsAdmin)