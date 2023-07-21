from rest_framework import serializers
from default.models import Patient
from default.models import Doctor

# PatientSerializer


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('fullname',
                  'mobile',
                  'email',
                  'gender',
                  'Birthdate',
                  'password')

# DoctorSerializer


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

    def update(self, instance, validated_data):
        # Exclude password and email from validated data
        validated_data.pop('password', None)
        validated_data.pop('email', None)

        # Call the default update() method to update other fields
        return super().update(instance, validated_data)
