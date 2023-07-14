from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
from django.db import models


class PatientManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        patient = self.model(email=email, **extra_fields)
        patient.set_password(password)
        patient.save()
        return patient

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Patient(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=100)
    mobile = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    gender = models.CharField(max_length=100)
    Birthdate = models.DateField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = PatientManager()

    USERNAME_FIELD = 'email'

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='patient_set',  # Added related_name
        related_query_name='patient'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='patient_set',  # Added related_name
        related_query_name='patient'
    )


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
