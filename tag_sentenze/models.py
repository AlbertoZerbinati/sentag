from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


class Schema(models.Model):
    def get_xml_string(self):
        return self.schema_file.read().decode('utf-8')
    
    
    schema_file = models.FileField(
        upload_to='uploads/', help_text='Choose the xsd file.')  # MEDIA_ROOT/uploads
    tags = models.TextField(default=get_xml_string)
    
    

    def save(self, *args, **kwargs):
        self.tags = self.schema_file.read().decode('utf-8')
        super(Schema, self).save(*args, **kwargs)



class Judgment(models.Model):
    def get_default_name(self):
        return self.judgment_file.name
    
    # Fields
    name = models.CharField(max_length=40, blank=True, default=get_default_name,unique=True)
    judgment_file = models.FileField(
        upload_to='uploads/', help_text='Choose the judgment file.')  # MEDIA_ROOT/uploads
    initial_text = models.TextField(blank=True)
    xsd = models.ForeignKey(
        Schema, on_delete=models.DO_NOTHING, null=True, verbose_name="The related xsd Schema",
    ) #on_update=models.DO_NOTHING


    # schema_xml = models.FileField(
    #     upload_to='uploads/', help_text='Scegli il file xml da utilizzare.')  # MEDIA_ROOT/uploads
    # completed = models.BooleanField(default=False)
    # testo_taggato_xml = models.TextField(blank=True)
    # token_manager = models.TextField(blank=True)

    # @property
    # def tags(self):
    #     xml_string = self.schema_xml.read().decode('utf-8')
    #     return xml_string

    # initialize the initial text on every save() 
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml and initial_text"""
        self.initial_text = self.judgment_file.read().decode('utf-8').replace("\n", " ")
        self.name = self.judgment_file.name

        super(Judgment, self).save(*args, **kwargs)

    # delete judgment FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.judgment_file.delete()

        super(Judgment, self).delete(*args, **kwargs)

    def __str__(self):
        """String for representing the Judgments object (in Admin site etc.)."""
        return self.name
