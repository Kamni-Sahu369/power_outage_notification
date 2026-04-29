"""
URL configuration for outagenotification project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from outagenotificationapp.views import *
from outagenotificationapp.views import fetch_outage_data
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',outagenotificationModelView.as_view()),
    path('api/<int:pk>/', outagenotificationModelView.as_view()), 
    path('api/login/',LoginView.as_view()),
    path('api/profile/<int:pk>/',MyProfileView.as_view()),
    path('api/contact/',ContactView.as_view()),
    path('api/outages/', fetch_outage_data, name='fetch_outage_data'),
    path('api/outages/count/', Count_outage_data, name='fetch_outage_data'),
    # for update and delete
    path('api/deleteupdate/<int:pk>/', outagenotificationModelView.as_view(), name='outage-detail-patch'),
    # path('api/tommorrowdata/', fetch_outage_data_selenium),
    path('sendmail/',send_outage_mail,name='send_outage_mail'),
    # path('sendemail/',send_mails),
    path('api/report/', ReportModelView.as_view()),
    path('api/updatestatus/<int:pk>/', OutageModelView.as_view()),
    path('api/updatestatus/update/<int:pk>/', OutageModelView.as_view()),
    path('api/updatestatus/', OutageModelView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

