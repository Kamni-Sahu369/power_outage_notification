from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import fetch_and_update_outages # import your task functions

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(fetch_and_update_outages, 'cron', hour=12, minute=15)
    scheduler.start()
