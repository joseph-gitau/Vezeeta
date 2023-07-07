from rest_framework import serializers
from default.models import Patient

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