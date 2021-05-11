from lxml import etree
from copy import copy
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

# Create your models here.
# from lxml import etree
# SCHEMA_SPACE = "{http://www.w3.org/2001/XMLSchema}"
# class Schema:
#     def __init__(self, schemafile):
#         self.root = etree.parse(schemafile)
#         for el in self.root.iter():
#             print(el.tag)

#     def findall(self, path):
#         print("findall:  ", path.replace("xs:",SCHEMA_SPACE))
#         return self.root.findall(path.replace("xs:", SCHEMA_SPACE))

#     def find(self, path):
#         return self.root.find(path.replace("xs:", SCHEMA_SPACE))

#     def names_of(self, nodes):
#         return [node.get("name") for node in nodes]

#     def get_Types(self, t_name):
#         return self.names_of(self.findall(t_name))

#     def get_simpleTypes(self):
#         return self.get_Types("xs:element")

#     def get_complexTypes(self):
#         return self.get_Types("xs:complexType")

#     def get_elements_of_attribute(self, attribute):
#         return self.names_of(self.findall(".//xs:element/xs:complexType/xs:" + attribute + "/../.."))

#     def get_element_attributes(self, name):
#         node = self.find(".//xs:element[@name='" + name + "']")
#         if node is None:
#             node = self.find(".//xs:complexType[@name='" + name + "']")
#         if node is None:
#             return None
#         else:
#             return node.attrib

class Sentenza(models.Model):
    # Fields
    nome = models.CharField(max_length=30, unique=True)
    sentenza = models.FileField(
        upload_to='uploads/', help_text='Scegli la sentenza da taggare.')  # MEDIA_ROOT/uploads
    schema_xml = models.FileField(
        upload_to='uploads/', help_text='Scegli il file xml da utilizzare.')  # MEDIA_ROOT/uploads
    completed = models.BooleanField(default=False)
    testo_iniziale = models.TextField(blank=True)
    testo_taggato_html = models.TextField(blank=True)
    testo_taggato_xml = models.TextField(blank=True)

    @property
    def tags(self):
        # import xml.etree.ElementTree as et
        # #create tag list
        # xml_file = self.schema_xml.read().decode('utf-8')

        # #print(xml_file.strip())
        # xml_tree = et.fromstring(xml_file)
        # tag_list = []
        # for elem in xml_tree.iter():
        #     print(elem.tag)
        #     print(elem.get('name'))
        #     if elem.get('name'):
        #         tag_list.append(elem.get('name'))

        # #print(tag_list)
        # return tag_list

        # import xmltodict
        # import json
        # namespaces = {
        #     'http://www.w3.org/2001/XMLSchema':None
        # }
        #print(json.dumps(xmltodict.parse(xml_string,namespaces=namespaces)))
        #return json.dumps(xmltodict.parse(xml_string,namespaces=namespaces))
        xml_string = self.schema_xml.read().decode('utf-8')
        # stripped_xml_string = ""
        # for line in xml_string.split('>'):
        #     print(line)
        #     if "<xs:element" in line or "<xs:attribute" in line:
        #         stripped_xml_string += "\n"+line
        #         print("YES")
        return xml_string
        
    # initialize the initial texts on first save()
    def save(self, *args, **kwargs):
        """On first save also initialize output_xml and initial_text"""
        if not self.testo_taggato_xml:
            self.testo_taggato_xml = self.sentenza.read().decode('utf-8').replace("\n", " ")
        if not self.testo_iniziale:
            self.testo_iniziale = self.testo_taggato_xml
        if not self.testo_taggato_html:
            self.testo_taggato_html = self.testo_taggato_xml

        super(Sentenza, self).save(*args, **kwargs)

    # delete sentenza FileField from file system on db-deletion
    def delete(self, *args, **kwargs):
        self.sentenza.delete()
        self.schema_xml.delete()

        super(Sentenza, self).delete(*args, **kwargs)

    def __str__(self):
        """String for representing the Sentenza object (in Admin site etc.)."""
        return self.nome
