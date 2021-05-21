from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


class Schema(models.Model):
    schema_file = models.FileField(
        upload_to='uploads/', help_text='Choose the xsd file.')  # MEDIA_ROOT/uploads
    name = models.CharField(max_length=40, blank=True, null=True, unique=True)
        
    @property
    def tags(self):
        xml_string = self.schema_file.read().decode('utf-8')
        return xml_string
    
    def delete(self, *args, **kwargs):
        self.schema_file.delete()
        super(Schema, self).delete(*args, **kwargs)

    def save(self, *args, **kwargs):     
        if not self.name:   
            self.name = self.schema_file.name
        super(Schema, self).save(*args, **kwargs)

    def __str__(self):
        """String for representing the Judgments object (in Admin site etc.)."""
        return self.name


class Judgment(models.Model):
    # Fields
    judgment_file = models.FileField(
        upload_to='uploads/', help_text='Choose the judgment file.')  # MEDIA_ROOT/uploads
    name = models.CharField(max_length=40, blank=True, unique=True)
    initial_text = models.TextField(blank=True)
    xsd = models.ForeignKey(
        Schema, on_delete=models.DO_NOTHING, blank=True, null=True, verbose_name="The related xsd Schema", related_name="attached_judgments"
    ) #on_update=models.DO_NOTHING


    # schema_xml = models.FileField(
    #     upload_to='uploads/', help_text='Scegli il file xml da utilizzare.')  # MEDIA_ROOT/uploads
    # completed = models.BooleanField(default=False)
    # testo_taggato_xml = models.TextField(blank=True)
    # token_manager = models.TextField(blank=True)


    # initialize the initial text on every save() 
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml and initial_text"""
        self.initial_text = self.judgment_file.read().decode('utf-8').replace("\n", " ")
        if not self.name:
            self.name = self.judgment_file.name

        super(Judgment, self).save(*args, **kwargs)

    # delete judgment FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.judgment_file.delete()
        super(Judgment, self).delete(*args, **kwargs)

    def __str__(self):
        """String for representing the Judgments object (in Admin site etc.)."""
        return self.name
