from django.db import models
from tag_sentenze.models import Judgment, Task

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# create a custom user model
class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    # many to many relationship between a Users and Judgments through Tagging
    taggings = models.ManyToManyField(
        Judgment, blank=True, through='users.Tagging')

    def __str__(self):
        return self.user.username+"'s Profile"

# table implementing the M2M relationship between Judgment and Profile
class Tagging(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    judgment = models.ForeignKey(Judgment, on_delete=models.CASCADE)
    token_manager = models.TextField(blank=True)
    comments = models.TextField(blank=True, null=True)
    xml_text = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = [['profile', 'judgment']]

    def __str__(self):
        return str(self.profile) + " tagging " + str(self.judgment)

# table implementing the M2M relationship between Judgment and Profile
class TaggingTask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    judgment = models.ForeignKey(Judgment, on_delete=models.CASCADE)
    token_manager = models.TextField(blank=True)
    comments = models.TextField(blank=True, null=True)
    xml_text = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    # TODO add:
    # arg_graph
    # rel_graph

    class Meta:
        unique_together = [['task', 'user', 'judgment']]

    def __str__(self):
        return str(self.user) + " tagging " + str(self.judgment) + " from " + str(self.task)

# class UserTasksSynonyms(models.Model):
#    user_task = models.ManyToManyField(User, through='UserTasks')


# table implementing the M2M relationship between User and Collection
'''class UserTasks(models.Model):
    #user_task = models.ForeignKey(UserTasksSynonyms, on_delete=models.CASCADE)
    collection = models.OneToOneField(Collection, on_delete=models.CASCADE , primary_key=True)
    user = models.ManyToManyField(to=User, blank=True)

    #class Meta:
    #    unique_together = [['collection', 'user']]

    def __str__(self):
        return str(self.user) + " perform " + str(self.collection)'''


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
