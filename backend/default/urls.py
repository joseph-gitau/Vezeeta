# import urls
from django.urls import re_path

from default import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    # re_path(r'^admin/', admin.site.urls),
    re_path(r'^api/Patient/add', views.PatientCreate),
    # Login
    re_path(r'^api/Patient/login', views.PatientLogin),
    # add doctor
    re_path(r'^api/Doctor/add', views.DoctorCreate),
    # Doctor/login
    re_path(r'^api/Doctor/login', views.DoctorLogin),
    # http://127.0.0.1:8000/api/Doctor/getProfile?doctorId=bot@gmail.com
    re_path(r'^api/Doctor/getProfile', views.DoctorProfile),
    # Doctor/updateProfile
    re_path(r'^api/Doctor/updateProfile', views.DoctorUpdateProfile),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
