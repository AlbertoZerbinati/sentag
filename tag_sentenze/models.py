from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

class Sentenza(models.Model):
    # Fields
    nome = models.CharField(max_length=30, unique=True)
    sentenza = models.FileField(
        upload_to='uploads/', help_text='Scegli la sentenza da taggare.')  # MEDIA_ROOT/uploads
    schema_xml = models.FileField(
        upload_to='uploads/', help_text='Scegli il file xml da utilizzare.')  # MEDIA_ROOT/uploads
    completed = models.BooleanField(default=False)
    testo_iniziale = models.TextField(blank=True)
    testo_taggato_xml = models.TextField(blank=True)
    token_manager = models.TextField(blank=True)

    @property
    def tags(self):
        xml_string = self.schema_xml.read().decode('utf-8')
        return xml_string
        
    # initialize the initial texts on first save()
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml and initial_text"""
        if not self.testo_taggato_xml:
            self.testo_taggato_xml = self.sentenza.read().decode('utf-8').replace("\n", " ")
        if not self.testo_iniziale:
            self.testo_iniziale = self.testo_taggato_xml

        super(Sentenza, self).save(*args, **kwargs)

    # delete sentenza FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.sentenza.delete()
        self.schema_xml.delete()

        super(Sentenza, self).delete(*args, **kwargs)

    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.nome
