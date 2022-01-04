from django.urls import path

from . import views

app_name = 'tag_sentenze'

urlpatterns = [
    path("", views.index, name="index"),
    path("sentenze/", views.list_sentenze, name="list-sentenze"),

    path("sentenza/<int:id>/<int:htbp>", views.tag_sentenza, name="tag-sentenza"),
    path("sentenza/<int:id>", views.tag_sentenza, name="tag-sentenza"),

    path("api/<int:id>", views.tagging_detail, name="api-get"),
    path("api/update/<int:id>", views.update_tagging, name="api-update"),
    path("api/completed/<int:id>", views.completed_tagging, name="api-compeleted"),

    path("download/<int:id>", views.download, name="download"),
    path("taggings/", views.taggings, name="list-taggings"),
    path("parse_xml", views.parse_xml, name="parse-xml"),

    path('list_tasks/', views.list_tasks, name='list_tasks'),
    path('list_taggings/<int:id>', views.list_taggings, name='list_taggings'),

]