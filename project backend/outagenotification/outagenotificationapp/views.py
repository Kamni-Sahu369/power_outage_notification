from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.hashers import check_password
from .models import CustomUser
from rest_framework import status
from django.contrib.auth import authenticate, login
# Create your views here.
class outagenotificationModelView(APIView):
    def post(self,request):
           serializerdata = CustomUserModelSerializer(data=request.data)    
           if  serializerdata.is_valid():
               serializerdata.save()
               return Response(serializerdata.data)
           return Response(serializerdata.errors)


    def get(self,request,pk=None):
        if pk:      
            shortage=CustomUser.objects.get(pk=pk)
            serializerdata=CustomUserModelSerializer(shortage)
            return Response(serializerdata.data)

        shortage=CustomUser.objects.all()
        serializerdata=CustomUserModelSerializer(shortage,many=True)
        return Response(serializerdata.data)
   
    def put(self, request, pk=None):
         if pk:
             try:
                 user = CustomUser.objects.get(pk=pk)  # ✅ Sahi model ka object lo
                 serializer = CustomUserModelSerializer(user, data=request.data, partial=True)
                 if serializer.is_valid():
                   serializer.save()
                   return Response(serializer.data, status=200)
                 return Response(serializer.errors, status=400)
             except CustomUser.DoesNotExist:
                return Response({"error": "User not found"}, status=404)
    def delete(self, request, pk=None):
        if pk:
             try:
                  user = CustomUser.objects.get(pk=pk)
                  user.delete()
                  return Response({"message": "User deleted successfully"}, status=204)
             except CustomUser.DoesNotExist:
                 return Response({"error": "User not found"}, status=404)
        return Response({"error": "PK not provided"}, status=400)
         

# for login 
from django.contrib.auth import authenticate
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("emailaddress")
        # print(email,"email")
        password = request.data.get("password")
        # print(password,"p")
        user = authenticate(emailaddress=email, password=password)

        if user:
            return Response({
                "message": "Login successful",
                "role": user.registrationType,  
                "name": user.name, 
                "id": user.id      
            }, status=status.HTTP_200_OK)    
        else:
            return Response({
                "error": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)


#myprofile section
class MyProfileView(APIView):

    def get(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            serializer = CustomUserModelSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)


# fetching data from cspdcl
import requests
import random
from django.http import JsonResponse

def fetch_outage_data(request):

    url = 'https://www.cspdcl.co.in/cseb/frmPowerOutageInfo.aspx'

    try:
        response = requests.get(url, timeout=10)  
        response.raise_for_status()  
    except requests.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch data', 'details': str(e)}, status=500)

    soup = BeautifulSoup(response.content, 'html.parser')
    outages = []

    outage_types = ["Feeder", "Transformer", "Meter"]  # possible types

    try:
        rows = soup.select('table tr')
        
        if len(rows) <= 17:
            return JsonResponse({'error': 'No outage data found'}, status=404)
        
        for row in rows[17:]:
            cols = row.find_all('td')
            
            if len(cols) < 9:
                continue  
            
            outage = {
                'sn': cols[0].text.strip() if len(cols) > 0 else '',
                'town': cols[1].text.strip() if len(cols) > 1 else '',
                'maintenance_activity': cols[2].text.strip() if len(cols) > 2 else '',
                'outage_affected_area': cols[3].text.strip() if len(cols) > 3 else '',
                'outage_area': cols[4].text.strip() if len(cols) > 4 else '',
                'outage_start_date': cols[5].text.strip() if len(cols) > 5 else '',
                'start_time': cols[6].text.strip() if len(cols) > 6 else '',
                'end_date': cols[7].text.strip() if len(cols) > 7 else '',
                'end_time': cols[8].text.strip() if len(cols) > 8 else '',
                'outage_type': random.choice(outage_types),  # 👈 randomly assign a type
                'status': random.choice(["Active", "Resolved", "Pending"]),  # 👈 optional: assign random status too
            }

            outages.append(outage)


    except Exception as e:
        return JsonResponse({'error': 'Unexpected error occurred', 'details': str(e)}, status=500)

    return JsonResponse(outages, safe=False)

    # ✅ Partial update outage by ID (PATCH)
def patch(self, request, pk):
        try:
            outage = Outage.objects.get(pk=pk)
        except Outage.DoesNotExist:
            return Response({"error": "Outage not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OutageModelSerializer(outage, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Outage partially updated successfully.", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# for schudular task
class OutageModelView(APIView):
    # Add new outage (POST)
    def post(self, request):
        serializer = OutageModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Outage added successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,pk=None):
        if pk:      
            shortage=Outage.objects.get(pk=pk)
            serializerdata=OutageModelSerializer(shortage)
            return Response(serializerdata.data)

        shortage=Outage.objects.all()
        serializerdata=OutageModelSerializer(shortage,many=True)
        return Response(serializerdata.data)     
    # Delete outage by ID (DELETE)
    def delete(self, request, pk):
        try:
            outage = Outage.objects.get(pk=pk)
        except Outage.DoesNotExist:
            return Response({"error": "Outage not found."}, status=status.HTTP_404_NOT_FOUND)

        outage.delete()
        return Response({"message": "Outage deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    # Update outage by ID (PATCH)
    def put(self, request, pk):
        try:
            outage = Outage.objects.get(pk=pk)
        except Outage.DoesNotExist:
            return Response({"error": "Outage not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OutageModelSerializer(outage, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Outage updated successfully.", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# for counting status
from bs4 import BeautifulSoup
import requests
import random
from django.http import JsonResponse
from collections import Counter

def Count_outage_data(request):
    url = 'https://www.cspdcl.co.in/cseb/frmPowerOutageInfo.aspx'

    try:
        response = requests.get(url, timeout=10)  
        response.raise_for_status()  
    except requests.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch data', 'details': str(e)}, status=500)

    soup = BeautifulSoup(response.content, 'html.parser')
    outages = []

    outage_types = ["Feeder", "Transformer", "Meter"]

    try:
        rows = soup.select('table tr')
        if len(rows) <= 17:
            return JsonResponse({'error': 'No outage data found'}, status=404)
        
        for row in rows[17:]:
            cols = row.find_all('td')
            if len(cols) < 9:
                continue

            outage = {
                'sn': cols[0].text.strip(),
                'town': cols[1].text.strip(),
                'maintenance_activity': cols[2].text.strip(),
                'outage_affected_area': cols[3].text.strip(),
                'outage_area': cols[4].text.strip(),
                'outage_start_date': cols[5].text.strip(),
                'start_time': cols[6].text.strip(),
                'end_date': cols[7].text.strip(),
                'end_time': cols[8].text.strip(),
                'outage_type': random.choice(outage_types),
                'status': random.choice(["Active", "Resolved", "Pending"]),
            }

            outages.append(outage)

        # 🎯 Count statuses
        status_counts = Counter([out['status'] for out in outages])

        return JsonResponse({
            "total_outage": len(outages),
            "active_outage": status_counts.get("Active", 0),
            "pending_outage": status_counts.get("Pending", 0),
            "resolved_outage": status_counts.get("Resolved", 0),
        })

    except Exception as e:
        return JsonResponse({'error': 'Unexpected error occurred', 'details': str(e)}, status=500)




# # fetching data from cspdcl for tommorow outage

# def fetch_outage_data_selenium(request):
#     from selenium import webdriver
#     from selenium.webdriver.chrome.options import Options
#     from datetime import datetime, timedelta
#     import time

#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")
#     driver = webdriver.Chrome(options=options)

#     url = 'https://www.cspdcl.co.in/cseb/frmPowerOutageInfo.aspx'
#     driver.get(url)

#     time.sleep(5)

#     soup = BeautifulSoup(driver.page_source, 'html.parser')
#     driver.quit()

#     outages = []
#     rows = soup.find_all('tr')
#     tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")

#     for row in rows:
#         cols = row.find_all('td')
#         if len(cols) < 9:
#             continue
#         outage_date = cols[5].text.strip()

#         # Debugging help - uncomment this if needed
#         # print("Found date:", outage_date)

#         if outage_date == tomorrow:
#             outages.append({
#                 'sn': cols[0].text.strip(),
#                 'town': cols[1].text.strip(),
#                 'maintenance_activity': cols[2].text.strip(),
#                 'outage_affected_area': cols[3].text.strip(),
#                 'outage_area': cols[4].text.strip(),
#                 'outage_start_date': cols[5].text.strip(),
#                 'start_time': cols[6].text.strip(),
#                 'end_date': cols[7].text.strip(),
#                 'end_time': cols[8].text.strip(),
#             })
#     for outage in outages:
#          print(outage['town'])  # Example: Town print karna

#     towns = [outage['town'] for outage in outages]
#     return JsonResponse({
#          "outages": outages,
#            "towns": towns
#        })


# for sending mail
from django.core.mail import send_mail
from bs4 import BeautifulSoup
import requests
def send_outage_mail(request):
    url = 'https://www.cspdcl.co.in/cseb/frmPowerOutageInfo.aspx'

    # Step 1: Fetch data from CSPDCL website
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch data', 'details': str(e)}, status=500)

    # Step 2: Parse HTML and extract outage info
    soup = BeautifulSoup(response.content, 'html.parser')
    outages = []

    try:
        rows = soup.select('table tr')
        if len(rows) <= 17:
            return JsonResponse({'error': 'No outage data found'}, status=404)

        for row in rows[17:]:
            cols = row.find_all('td')
            if len(cols) < 9:
                continue

            outage = {
                'outage_area': cols[4].text.strip(),         # ✅ Corrected key name
                'start_time': cols[6].text.strip(),
                'end_time': cols[8].text.strip(),
            }
            outages.append(outage)
    except Exception as e:
        return JsonResponse({'error': 'Parsing error', 'details': str(e)}, status=500)

    # Step 3: Loop through registered users
    users = CustomUser.objects.all()
    sent_emails = []

    for outage in outages:
        outage_area = outage['outage_area'].lower()  # ✅ Use correct key

        for user in users:
            if user.address and outage_area in user.address.lower():
                try:
                    send_mail(
                        subject='⚡ Power Outage Alert',
                        message=f"""
Hello {user.name},

⚠️ Power outage alert for your area! is starts from

# 📍 Address: {outage['outage_area']}
🕒 Start Time: {outage['start_time']} and end in
🕔 End Time: {outage['end_time']}

Stay prepared,
CSPDCL Notification System
""",
                        from_email='sahunami843525@gmail.com',
                        recipient_list=[user.emailaddress],  # ✅ Assuming emailaddress is correct field
                        fail_silently=False,
                    )
                    print(f"✔️ Match found: Outage at '{outage['outage_area']}' → Email sent to {user.emailaddress}")
                    sent_emails.append(user.emailaddress)
                except Exception as e:
                    print(f"❌ Failed to send email to {user.emailaddress}: {e}")

    return JsonResponse({'message': 'Emails sent to matched users', 'sent_to': sent_emails})


# for contact section
from django.conf import settings

class ContactView(APIView):
    def post(self, request):
        serializer = ContactModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Get name & email from validated data
            name = serializer.validated_data.get("name")
            email = serializer.validated_data.get("email")

            # Send confirmation email
            send_mail(
                subject="Thank you for contacting CSPDCL",
                message=f"Hi {name},\n\nThank you for reaching out to CSPDCL. We have received your message and will get back to you shortly.\n\nRegards,\nCSPDCL Team",
                #  message=f"Muskura le oo chhand se chehre wale! \n\n🤭😁",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response(serializer.data)
        return Response(serializer.errors)



from rest_framework.parsers import MultiPartParser, FormParser
class ReportModelView(APIView):
    def post(self,request):
        parser_classes = (MultiPartParser, FormParser)
        serializers=ReportModelSerializer(data=request.data)
        if serializers.is_valid():
             serializers.save()
             return Response(serializers.data)
        return Response(serializers.errors)     
     
    def get(self,request,pk=None):
         if pk:
             try:
                 report = ReportModel.objects.get(pk=pk)
                 serializerdata = ReportModelSerializer(report)
                 return Response(serializerdata.data)
             except ReportModel.DoesNotExist:
                 return Response({"error": "Report not found"}, status=404)

         report = ReportModel.objects.all()
         serializerdata = ReportModelSerializer(report, many=True)
         return Response(serializerdata.data)