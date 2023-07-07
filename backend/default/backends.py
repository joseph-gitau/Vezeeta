from django.contrib.auth.backends import BaseBackend
from default.models import Patient


class PatientEmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            patient = Patient.objects.get(email=email)
            if patient.check_password(password):
                return patient
        except Patient.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Patient.objects.get(pk=user_id)
        except Patient.DoesNotExist:
            return None
