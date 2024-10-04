from datetime import date, datetime
import os
from pprint import pprint
import django
from dateutil.relativedelta import relativedelta
from django.db.models.functions import TruncDate

import sys
sys.path.append('/Users/rkakengi/coding_projects/trackrunner/backend')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from running.models import RunActivity, Route
from django.db.models import F


if __name__ == "__main__":
    end_date = date.today() + relativedelta(days=1)
    start_date = end_date - relativedelta(months=3)
    active = list(RunActivity.objects.select_related('route').filter(user=2, finished__gte=start_date, finished__lte=end_date)
                  .annotate(date=TruncDate('finished'), routeField=F('route__name'))
                  .values('date', 'routeField').distinct())
    pprint(active)