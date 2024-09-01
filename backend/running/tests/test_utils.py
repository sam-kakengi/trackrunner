import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from django.test import TestCase
from datetime import datetime
from running.utils import format_ordinal_suffix, format_seconds

def test_format_ordinal_suffix():
    # Test case 1: Day with "st" suffix
    value = datetime(2022, 1, 1)
    result = format_ordinal_suffix(value)
    assert result == "1st Jan"

    # Test case 2: Day with "nd" suffix
    value = datetime(2022, 2, 2)
    result = format_ordinal_suffix(value)
    assert result == "2nd Feb"

    # Test case 3: Day with "rd" suffix
    value = datetime(2022, 3, 3)
    result = format_ordinal_suffix(value)
    assert result == "3rd Mar"

    # Test case 4: Day with "th" suffix
    value = datetime(2022, 4, 4)
    result = format_ordinal_suffix(value)
    assert result == "4th Apr"

    # Test case 5: Day with "th" suffix (10-19)
    value = datetime(2022, 11, 15)
    result = format_ordinal_suffix(value)
    assert result == "15th Nov"

    # Test case 6: Include year
    value = datetime(2022, 5, 5)
    result = format_ordinal_suffix(value, include_year=True)
    assert result == "5th May 22"

def test_format_seconds():
    assert format_seconds(0) == "00:00"
    assert format_seconds(59) == "00:59"
    assert format_seconds(60) == "01:00"
    assert format_seconds(3661) == "01:01:01"
    assert format_seconds(3600) == "01:00:00"
    assert format_seconds(7200) == "02:00:00"
    assert format_seconds(3660) == "01:01:00"
    assert format_seconds(3601) == "01:00:01"