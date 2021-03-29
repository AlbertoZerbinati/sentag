from django.db import models

# Create your models here.
class Sentenza(models.Model):
    # Fields
    nome = models.CharField(max_length=30, unique=True)
    sentenza = models.FileField(upload_to='uploads/', help_text='Scegli la sentenza da taggare.') #MEDIA_ROOT/uploads
    output_xml = models.CharField(max_length=10000000, blank=True)
    # xml_schema = models.FileField(upload_to='uploads/') #MEDIA_ROOT/uploads
    # completed (boolean)
    
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml"""
        if not self.output_xml:
            self.output_xml = self.sentenza.read().decode('utf-8')
        super(Sentenza, self).save(*args, **kwargs)

    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.nome
