from django import template

#check if user belong to Editor Group in template
register = template.Library()

@register.filter(name='is_editor')
def is_editor(user):
    return user.groups.filter(name='Editors').exists()