from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from geopy.geocoders import Nominatim


# # Create your models here.
class outagenotificationModel(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    address=models.CharField(max_length=200)
    
class CustomUserManager(BaseUserManager):

    def create_user(self, emailaddress, name, password=None, **extra_fields):
        if not emailaddress:
            raise ValueError("The Email field is required")
        emailaddress = self.normalize_email(emailaddress)

        user = self.model(emailaddress=emailaddress, name=name, **extra_fields)

        if password:
            user.set_password(password)  # ✅ Correct usage
        else:
            raise ValueError("Password is required")

        user.save(using=self._db)
        return user


    def create_superuser(self, emailaddress, name, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(emailaddress, name, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    registrationType = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    name= models.CharField(max_length=200)
    address= models.CharField(max_length=200)
    mobilenumber= models.BigIntegerField(unique=True,null=True)
    houseno= models.CharField(max_length=200)
    emailaddress=models.EmailField(unique=True)
    pincode= models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
        # ✅ Add this for image upload
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "emailaddress"
    REQUIRED_FIELDS = ["name"]

    def str(self):
        return self.emailaddress

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
class ContactModel(models.Model):
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=50)
    message=models.CharField(max_length=200)

class ReportModel(models.Model):
      typeIssue=[
          (' voltage', ' Voltage Fluctuation'),
          ('no-supply', 'No Power Supply'),
          ('low-voltage', 'Low Voltage'),
          ('meter-issue', ' Meter Issue'),
          ('sparking', 'Sparking in Line'),
          ('line-down', 'Line Down'),
          ('scheduled-maintenance', 'Scheduled Maintenance'),
          ('others', 'Others'),
        ]

      fullName=models.CharField(max_length=200)
      email= models.EmailField(max_length=50)
      address= models.CharField(max_length=200)
      issueType=models.CharField(max_length=200,choices=typeIssue)
      issueDateTime=models.DateTimeField(auto_now_add=True)
      description=models.CharField(max_length=400)
      image=models.ImageField(upload_to='images/',null=True,blank=True)
     
      def __str__(self):
           return self.name

# for updating cspdcls data      

from django.db import models
class Outage(models.Model):
    sn = models.CharField(max_length=50)
    town = models.CharField(max_length=200)
    maintenance_activity = models.TextField()
    outage_affected_area = models.TextField()
    outage_area = models.TextField()
    outage_start_date = models.CharField(max_length=100)
    start_time = models.CharField(max_length=50)
    end_date = models.CharField(max_length=100)
    end_time = models.CharField(max_length=50)
    outage_type = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

     # ✅ New fields for geolocation
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.latitude or not self.longitude:
            geolocator = Nominatim(user_agent="outagenotificationapp")
            # location = geolocator.geocode(f"{self.outage_area}, {self.town}")
            location = geolocator.geocode(self.town)

            if location:
                self.latitude = location.latitude
                self.longitude = location.longitude
        super(Outage, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.town} - {self.outage_type} - {self.status}"
