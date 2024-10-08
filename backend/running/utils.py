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
    if seconds is None:
        return "00:00"
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = int(seconds % 60)
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    else:
        return f"{minutes:02d}:{seconds:02d}"

def format_duration(duration: int) -> str:
    """Converts a duration in seconds to the minute format MM:SS string."""
    if duration is None:
        return "00:00" 
    total_seconds = int(duration)
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    return f"{minutes:02d}:{seconds:02d}"
