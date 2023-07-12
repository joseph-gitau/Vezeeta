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


""" class Doctor(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100)
    affiliation = models.CharField(max_length=100, blank=True)
    experience = models.CharField(max_length=100, blank=True)
    education = models.TextField(blank=True)
    language_proficiency = models.CharField(max_length=100, blank=True)
    professional_certifications = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to='doctor_profiles/', blank=True) """

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
