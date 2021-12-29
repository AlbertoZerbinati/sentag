from django.contrib import admin
from .models import Judgment, Schema, Task

class TaskAdmin(admin.ModelAdmin):
    filter_horizontal = ['users', 'judgments']

class CollectionUserAdmin(admin.ModelAdmin):
    filter_horizontal = ['user',]

admin.site.register(Judgment)
admin.site.register(Schema)
admin.site.register(Task, TaskAdmin)
