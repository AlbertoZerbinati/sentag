from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
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
    
    path("parse_xml", views.parse_xml, name="parse-xml"),

    path("agreement", views.agreement_page, name="agreement-page"),
    path("calc_agreement/<int:id>", views.agreement_post, name="calculate-agreement"),

    path('manage_users', views.manage_users, name='manage-users'),
    path('delete_user/<int:id>', views.delete_user, name='delete-user'),
    path('update_user/<int:id>', views.update_user, name='update-user'),

    path('manage_schemas', views.manage_schemas, name='manage-schemas'),
    path("add_schemas", views.add_schemas, name="add-schemas"),
    path("delete_schema/<int:id>", views.delete_schema, name="delete-schema"),
    path("view_schema/<int:id>", views.view_schema, name="view-schema"),

    path('manage_juds/', views.manage_juds, name='manage-juds'),
    path("add_judgments", views.add_judgments, name="add-judgments"),
    path("delete_judgment/<int:id>", views.delete_judgment, name="delete-judgment"),
    path("view_judgment/<int:id>", views.view_judgment, name="view-judgment"),


    path('manage_tasks/', views.manage_tasks, name='manage-tasks'),
    path('new_task/', views.new_task, name='new-task'),
    path('update_task/<int:id>', views.update_task, name='update-task'),
    path('delete_task/<int:id>', views.delete_task, name='delete-task'),



]