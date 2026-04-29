from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Outage  # ✅ import model from models.py
User = get_user_model()

class CustomUserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        # Hash the password if provided in the form
        if form.cleaned_data.get('password'):
            obj.set_password(form.cleaned_data['password'])
        obj.save()

admin.site.register(User, CustomUserAdmin)

# for implementing geocoding
@admin.register(Outage)
class OutageAdmin(admin.ModelAdmin):
    list_display = ('sn', 'town', 'maintenance_activity', 'outage_affected_area', 'outage_area', 'outage_start_date', 'start_time', 'end_date', 'end_time', 'outage_type', 'status', 'latitude', 'longitude')


