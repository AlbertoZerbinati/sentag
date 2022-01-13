from django.urls import path

from . import views

app_name = 'tag_sentenze'

urlpatterns = [
    path("", views.index, name="index"),
    path("my_tasks/", views.my_tasks, name="my-tasks"),
    path("my_taggings/<int:id>", views.my_taggings, name="my-taggings"),

    path("sentenza/<int:id>/<int:htbp>", views.tag_sentenza, name="tag-sentenza"),
    path("sentenza/<int:id>", views.tag_sentenza, name="tag-sentenza"),

    path("api/<int:id>", views.tagging_detail, name="api-get"),
    path("api/update/<int:id>", views.update_tagging, name="api-update"),
    path("api/completed/<int:id>", views.completed_tagging, name="api-compeleted"),

    path("download/<int:task_id>/<str:jud_id>/<str:user_id>", views.download, name="download"),

    path('list_tasks_download/', views.list_tasks_download, name='list-tasks-download'),
    path('list_taggings_download/<int:id>', views.list_taggings_download, name='list-taggings-download'),

]
