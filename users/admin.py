from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from users.models import Profile

# Register your models here.
class PermissionInline(admin.StackedInline):
    model = Profile
    can_delete = True
    verbose_name_plural = 'profile'
    filter_horizontal = ('permission',)

class UserAdmin(BaseUserAdmin):
    inlines = (PermissionInline,)

class PermissionAdmin(admin.ModelAdmin):
    filter_horizontal = ('permission',)

#change permission field
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Profile, PermissionAdmin)