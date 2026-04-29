import requests
import random
from bs4 import BeautifulSoup
from .models import Outage

def fetch_and_update_outages():
    print("Fetching outages from CSPDCL (scheduler task)...")

    url = 'https://www.cspdcl.co.in/cseb/frmPowerOutageInfo.aspx'
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.content, 'html.parser')

    outage_types = ["Feeder", "Transformer", "Meter"]

    rows = soup.select('table tr')
    if len(rows) <= 17:
        print("No outage data found.")
        return

    # Delete old data before inserting new
    Outage.objects.all().delete()

    outages = []
    for row in rows[17:]:
        cols = row.find_all('td')
        if len(cols) < 9:
            continue

        outage = Outage(
            sn = cols[0].text.strip(),
            town = cols[1].text.strip(),
            maintenance_activity = cols[2].text.strip(),
            outage_affected_area = cols[3].text.strip(),
            outage_area = cols[4].text.strip(),
            outage_start_date = cols[5].text.strip(),
            start_time = cols[6].text.strip(),
            end_date = cols[7].text.strip(),
            end_time = cols[8].text.strip(),
            outage_type = random.choice(outage_types),
            status = random.choice(["Active", "Resolved", "Pending"]),
        )
        outages.append(outage)

    for outage in outages:
        outage.save()
    print("Outage data updated successfully.")
