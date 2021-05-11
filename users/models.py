from django.db import models
from tag_sentenze.models import Sentenza

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

#create a custom user model with the field for permissions on sentenze model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #many to many relationship between a Users and Sentenze
    permission = models.ManyToManyField(Sentenza, blank=True)

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()