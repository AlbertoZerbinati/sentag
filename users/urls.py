from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path("", views.editor_page, name="editor_page"),
    path("permission", views.home_permission, name="home-permission"),
    path("user/<int:id>", views.user_permission, name="user-permission"),
    path("add_permission/<str:utente>", views.add_permission, name="add-permission"),
    path("remove_permission/<str:utente>", views.remove_permission, name="remove-permission"),
    path("add_permission_list/<str:utente>", views.add_permission_list, name="add-permission-list"),
    path("remove_permission_list/<str:utente>", views.remove_permission_list, name="remove-permission-list"),
    path("judgment_schema", views.home_judgment_schema, name="home-judgment-schema"),
    path("join_judgment_schema/<int:id>", views.join_schema, name="join-judgment-schema"),
    path("add_sentenza_schema/<str:schema>", views.add_sentenza_schema, name="add-sentenza-schema"),
    path("remove_sentenza_schema/<str:schema>", views.remove_sentenza_schema, name="remove-sentenza-schema"),
    path("add_sentenza_schema_list/<str:schema>", views.add_sentenza_schema_list, name="add-sentenza-schema-list"),
    path("remove_sentenza_schema_list/<str:schema>", views.remove_sentenza_schema_list, name="remove-sentenza-schema-list"),
    path("agreement", views.agreement_page, name="agreement-page"),
    path("calc_agreement/<int:id>", views.agreement_post, name="calculate-agreement"),
    path("delete_files/", views.delete_files, name="delete-files")
]