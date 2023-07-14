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
        fields = ('full_name',
                  'email',
                  'password',
                  'mobile_number',
                  'specialty',
                  'license_number',
                  'affiliation',
                  'experience',
                  'education',
                  'language_proficiency',
                  'professional_certifications',
                  'profile_picture')
