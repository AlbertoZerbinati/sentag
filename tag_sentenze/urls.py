from django.urls import path

from . import views

app_name = 'tag_sentenze'

urlpatterns = [
    path("", views.index, name="index"),
    path("sentenze/", views.list_sentenze, name="list-sentenze"),
    path("new_sentenza/", views.new_sentenza, name="new-sentenza"),
    path("sentenza/<int:id>/", views.tag_sentenza, name="tag-sentenza"),
    path("new-tag/<str:nome>/", views.new_tag, name="new-tag"),
]