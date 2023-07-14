# import urls
from django.urls import re_path

from default import views

urlpatterns = [
    # re_path(r'^admin/', admin.site.urls),
    re_path(r'^api/Patient/add', views.PatientCreate),
    # Login
    re_path(r'^api/Patient/login', views.PatientLogin),
    # add doctor
    # re_path(r'^api/Doctor/add', views.DoctorCreate),
]
