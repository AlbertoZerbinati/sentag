from rest_framework import serializers
from .models import Sentenza

class SentenzaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentenza
        fields = ['nome','testo_iniziale','tags','completed']
