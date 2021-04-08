from django.db import models

# Create your models here.
class Sentenza(models.Model):
    # Fields
    nome = models.CharField(max_length=30, unique=True)
    sentenza = models.FileField(upload_to='uploads/', help_text='Scegli la sentenza da taggare.') #MEDIA_ROOT/uploads
    # FIELD DA AGGIUNGERE PER COMPLETARE IL MODELLO
    xml_schema = models.FileField(upload_to='uploads/', help_text='Scegli il file xml da utilizzare.', null = True) #MEDIA_ROOT/uploads
    # title (string)
    # completed (boolean)

    # delete sentenza FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.sentenza.delete()
        super(Sentenza,self).delete(*args,**kwargs)
 
    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.sentenza.name
