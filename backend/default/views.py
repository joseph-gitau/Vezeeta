from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from default.models import Patient
from default.serializers import PatientSerializer
from rest_framework.decorators import api_view
import re
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
#  import the PatientEmailBackend
import default.backends


@api_view(['POST'])
def PatientCreate(request):
    if request.method == 'POST':
        Patient_data = JSONParser().parse(request)
        Patient_serializer = PatientSerializer(data=Patient_data)

        if Patient_serializer.is_valid():
            # Additional validation checks
            email = Patient_data.get('email')
            password = Patient_data.get('password')

            # Check if the email is valid
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return JsonResponse({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the email already exists
            if Patient.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the password meets the required strength
            if len(password) < 8:
                return JsonResponse({'error': 'Password should be at least 8 characters long'}, status=status.HTTP_400_BAD_REQUEST)

            # Hash the password
            hashed_password = make_password(password)

            # Save the patient with the hashed password
            Patient_serializer.save(password=hashed_password)
            return JsonResponse(Patient_serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(Patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def PatientLogin(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)

        user = authenticate(request=request, email=email, password=password)

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials.'}, status=401)

    return Response({'error': 'Invalid request.'}, status=400)
