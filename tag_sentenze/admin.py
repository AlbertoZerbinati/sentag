from django.contrib import admin
from .models import Judgment, Schema, Collection

class CollectionAdmin(admin.ModelAdmin):
    filter_horizontal = ['users', 'judgments']

#class CollectionUserAdmin(admin.ModelAdmin):
#    filter_horizontal = ['user',]

admin.site.register(Judgment)
admin.site.register(Schema)
admin.site.register(Collection, CollectionAdmin)
