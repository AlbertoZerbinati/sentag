from rest_framework import serializers
from .models import Judgment

class JudgmentSerializer(serializers.ModelSerializer):
    tags = serializers.CharField(source='xsd.tags', read_only=True)

    class Meta:
        model = Judgment
        fields = ['name','initial_text','tags']
        #,'token_manager','tags','completed']
        #  'profiles.permission.completed'
