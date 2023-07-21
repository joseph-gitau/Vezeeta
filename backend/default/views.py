from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from default.models import Patient, Doctor
from default.serializers import PatientSerializer, DoctorSerializer
from rest_framework.decorators import api_view
import re
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import FileUploadParser
from django.middleware.csrf import get_token

# File parser
parser_classes = (FileUploadParser,)


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


@csrf_exempt
@api_view(['POST'])
def PatientLogin(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the email and password are provided
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        # Check if authentication was successful
        if user is not None:
            login(request, user)
            # Retrieve the email and name from the authenticated user
            user_email = user.email
            user_name = user.fullname

            # Get the CSRF token and session ID
            csrftoken = get_token(request)
            sessionid = request.session.session_key

            # Set the CSRF token and session ID as cookies
            response = JsonResponse(
                {'message': 'Login successful', 'email': user_email, 'name': user_name})
            response.set_cookie('csrftoken', csrftoken)
            response.set_cookie('sessionid', sessionid)

            return response
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)


""" @csrf_exempt
@api_view(['POST'])
def PatientLogin(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the email and password are provided
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        # Check if authentication was successful
        if user is not None:
            login(request, user)
            # Retrieve the email and name from the authenticated user
            user_email = user.email
            user_name = user.fullname
            return JsonResponse({'message': 'Login successful', 'email': user_email, 'name': user_name})
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED) """

# api/Doctor/add


@api_view(['POST'])
def DoctorCreate(request, *args, **kwargs):
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the email is valid
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return JsonResponse({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email already exists
        if Doctor.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the password meets the required strength
        if len(password) < 8:
            return JsonResponse({'error': 'Password should be at least 8 characters long'}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password
        hashed_password = make_password(password)
        # Save the doctor with the hashed password
        serializer.save(password=hashed_password)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DoctorLogin


@csrf_exempt
@api_view(['POST'])
def DoctorLogin(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the email and password are provided
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        # Check if authentication was successful
        if user is not None:
            login(request, user)
            # Retrieve the email and name from the authenticated user
            user_email = user.email
            user_name = user.fullname
            return JsonResponse({'message': 'Login successful', 'email': user_email, 'name': user_name})
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

# DoctorProfile


@api_view(['GET'])
def DoctorProfile(request):
    if request.method == 'GET':
        # Get data from the request
        # Change 'email' to 'doctorId' here
        email = request.GET.get('doctorId')

        # get the doctor with the given email
        try:
            doctor = Doctor.objects.get(email=email)
        except Doctor.DoesNotExist:
            return JsonResponse({'error': 'Doctor not found'}, status=404)

        # Serialize the doctor
        serializer = DoctorSerializer(doctor, many=False)
        return JsonResponse(serializer.data, safe=False)

# DoctorUpdateProfile


@api_view(['PUT'])
def DoctorUpdateProfile(request):
    if request.method == 'PUT':
        # Get data from the request
        email = request.data.get('email')

        # get the doctor with the given email
        try:
            doctor = Doctor.objects.get(email=email)
        except Doctor.DoesNotExist:
            return JsonResponse({'error': 'Doctor not found'}, status=404)

        # Serialize the doctor
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
