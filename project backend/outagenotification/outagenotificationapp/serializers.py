from rest_framework import serializers
from .models import *

class CustomUserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields='__all__'
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
class ContactModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactModel
        fields='__all__'
class ReportModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportModel
        fields='__all__'

class OutageModelSerializer(serializers.ModelSerializer):
     class Meta:
         model = Outage
         fields ='__all__'

