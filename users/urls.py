from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path("", views.editor_page, name="editor_page"),
    path("user/<int:id>", views.user_permission, name="user-permission"),
    path("add_permission/<str:utente>", views.add_permission, name="add-permission"),
    path("remove_permission/<str:utente>", views.remove_permission, name="remove-permission"),
    path("add_permission_list/<str:utente>", views.add_permission_list, name="add-permission-list"),
    path("remove_permission_list/<str:utente>", views.remove_permission_list, name="remove-permission-list")
]