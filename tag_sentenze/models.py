from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

# Create your models here.
class Sentenza(models.Model):
    # Fields
    nome = models.CharField(max_length=30, unique=True)
    sentenza = models.FileField(upload_to='uploads/', help_text='Scegli la sentenza da taggare.') #MEDIA_ROOT/uploads
    output_xml = models.TextField(blank=True)
    initial_text = models.TextField(blank=True)
    # xml_schema = models.FileField(upload_to='uploads/') #MEDIA_ROOT/uploads
    # completed (boolean)
    
    # initialize the output_xml on first save()
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml and initial_text"""
        if not self.output_xml:
            self.output_xml = self.sentenza.read().decode('utf-8').replace("\r\n", "\n")
        if not self.initial_text:
            self.initial_text = self.output_xml
        
        super(Sentenza, self).save(*args, **kwargs)

    # delete sentenza FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.sentenza.delete()
        
        super(Sentenza,self).delete(*args,**kwargs)

    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.nome
