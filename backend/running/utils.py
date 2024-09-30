from django.utils.translation import gettext as _
from django.utils.dateformat import format
from datetime import datetime

def format_ordinal_suffix(value: datetime, include_year: bool = False) -> str:
    """Formats the day of the month with the appropriate ordinal suffix."""
    if 10 <= value.day % 100 < 20:
        suffix = _("th")
    else:
        suffix = {1: _("st"), 2: _("nd"), 3: _("rd")}.get(value.day % 10, _("th"))
    month = format(value, 'M')
    return f"{value.day}{suffix} {month}" if not include_year else f"{value.day}{suffix} {month} {str(value.year)[2:]}"

def format_seconds(seconds: float) -> str:
    """Converts a float representing seconds into the format HH:MM:SS or MM:SS."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = int(seconds % 60)
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    else:
        return f"{minutes:02d}:{seconds:02d}"

def get_duration_formatted(self, obj):
            total_seconds = int(obj.duration)
            minutes = total_seconds // 60
            seconds = total_seconds % 60
            return f"{int(minutes):02d}:{int(seconds):02d}"

def get_date_formatted(self, obj):
            date = obj.finished
            day = date.day
            month = date.strftime('%b')
            
            if 4 <= day <= 20 or 24 <= day <= 30:
                suffix = "th"
            else:
                suffix = ["st", "nd", "rd"][day % 10 - 1]
            
            return f"{day}{suffix} {month}"