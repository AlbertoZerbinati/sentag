from rest_framework import serializers
from users.models import Tagging

class TaggingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='judgment.name', read_only=True)
    initial_text = serializers.CharField(source='judgment.initial_text', read_only=True)
    tags = serializers.CharField(source='judgment.xsd.tags', read_only=True)

    class Meta:
        model = Tagging
        fields = ['name','initial_text','xml_text','tags','token_manager','comments','completed']