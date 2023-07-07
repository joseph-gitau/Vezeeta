from django.db import models

# Create your models here.


class Patient(models.Model):
    fullname = models.CharField(max_length=100)
    mobile = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    Birthdate = models.DateField()
    password = models.CharField(max_length=100)


class Doctor(models.Model):
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
        upload_to='doctor_profiles/', blank=True)

    def __str__(self):
        return self.full_name
