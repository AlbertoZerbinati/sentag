from django.db import models
from tag_sentenze.models import Judgment

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

#create a custom user model with the field for permissions on sentenze model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #many to many relationship between a User and his Judgments through Tagging
    # permission = models.ManyToManyField(Judgment, blank=True, related_name="profiles")
    permission = models.ManyToManyField(Judgment, blank=True, through="Tagging", related_name="profiles")

class Tagging(models.Model):
    id_profile = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    id_judgment = models.ForeignKey(Judgment, on_delete=models.DO_NOTHING)
    token_manager = models.TextField(blank=True)
    xml_text = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = [['id_profile', 'id_judgment']]



@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()