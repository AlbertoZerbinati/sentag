from django.db import models
from tag_sentenze.models import Judgment

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

#create a custom user model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    #many to many relationship between a Users and Judgments through Tagging
    taggings = models.ManyToManyField(Judgment, blank=True, through='users.Tagging')
    
    def __str__(self):
        return self.user.username+"'s Profile"

#table implementing the M2M relationship between Judgment and Profile
class Tagging(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    judgment = models.ForeignKey(Judgment, on_delete=models.DO_NOTHING)
    token_manager = models.TextField(blank=True)
    xml_text = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = [['profile', 'judgment']]

    def __str__(self):
        return str(self.profile) + " tagging " + str(self.judgment)


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()