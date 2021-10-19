from django.urls import path

from . import views

app_name = 'tag_sentenze'

urlpatterns = [
    path("", views.index, name="index"),
    path("sentenze/", views.list_sentenze, name="list-sentenze"),
    path("new_sentenza/", views.new_sentenza, name="new-sentenza"),
    path("new_schema", views.new_schema, name="new-schema"),
    path("add_multiple_judgment", views.add_multiple_judgments, name="multiple-judgment"),
    path("add_multiple_schema", views.add_multiple_schemas, name="multiple-schemas"),
    path("sentenza/<int:id>/", views.tag_sentenza, name="tag-sentenza"),
    path("api/<int:id>", views.tagging_detail, name="api-get"),
    path("api/update/<int:id>", views.update_tagging, name="api-update"),
    path("api/completed/<int:id>", views.completed_tagging, name="api-compeleted"),
    path("download/<int:id>", views.download, name="download"),
    path("taggings/", views.list_taggings, name="list-taggings"),
    path("graph/arg/<int:id>", views.graph, name="graph-arg"),
    path("graph/rel/<int:id>", views.graph, name="graph-rel"),
]