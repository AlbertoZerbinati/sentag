from django.db import models

# Create your models here.
class Sentenza(models.Model):
    # Fields
    sentenza = models.FileField(upload_to='uploads/', help_text='Scegli la sentenza da taggare.') #MEDIA_ROOT/uploads
    # FIELD DA AGGIUNGERE PER COMPLETARE IL MODELLO
    # xml_schema = models.FileField(upload_to='uploads/') #MEDIA_ROOT/uploads
    # output_xml (file)
    # title (string)
    # completed (boolean)
 
    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.sentenza.name
