#!/usr/bin/env python3
"""
Fetch running activities from Garmin Connect and store as JSON files.

This script uses the unofficial garminconnect library to authenticate
and fetch running activities from Garmin Connect.

Usage:
    python scripts/fetch-garmin-data.py

Environment variables required:
    GARMIN_EMAIL - Your Garmin Connect email
    GARMIN_PASSWORD - Your Garmin Connect password
"""

import os
import json
import sys
from pathlib import Path
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

try:
    from garminconnect import Garmin
except ImportError:
    print("Error: garminconnect library not installed.")
    print("Install it with: pip install garminconnect")
    sys.exit(1)

# Load environment variables
load_dotenv()

# Configuration
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "running"
ACTIVITIES_DIR = DATA_DIR / "activities"
STATS_FILE = DATA_DIR / "stats.json"
LAST_SYNC_FILE = DATA_DIR / "last-sync.json"

# Create directories if they don't exist
ACTIVITIES_DIR.mkdir(parents=True, exist_ok=True)


def get_garmin_client() -> Optional[Garmin]:
    """Authenticate with Garmin Connect and return client."""
    email = os.getenv("GARMIN_EMAIL")
    password = os.getenv("GARMIN_PASSWORD")

    if not email or not password:
        print("Error: GARMIN_EMAIL and GARMIN_PASSWORD must be set in .env file")
        return None

    try:
        client = Garmin(email, password)
        client.login()
        print("✓ Successfully authenticated with Garmin Connect")
        return client
    except Exception as e:
        print(f"Error authenticating with Garmin Connect: {e}")
        return None


def fetch_running_activities(client: Garmin, start_date: Optional[datetime] = None) -> List[Dict[str, Any]]:
    """
    Fetch running activities from Garmin Connect.
    
    Args:
        client: Authenticated Garmin client
        start_date: Optional start date to fetch activities from
    
    Returns:
        List of activity dictionaries
    """
    try:
        # Get activities from the last 365 days by default, or from start_date
        if start_date is None:
            start_date = datetime.now() - timedelta(days=365)
        
        activities = client.get_activities_by_date(
            start_date.strftime("%Y-%m-%d"),
            datetime.now().strftime("%Y-%m-%d")
        )
        
        # Filter for running activities only
        running_activities = [
            activity for activity in activities
            if activity.get("activityType", {}).get("typeKey") == "running"
        ]
        
        print(f"✓ Found {len(running_activities)} running activities")
        return running_activities
    except Exception as e:
        print(f"Error fetching activities: {e}")
        return []


def get_activity_details(client: Garmin, activity_id: str) -> Optional[Dict[str, Any]]:
    """Fetch detailed information for a specific activity."""
    try:
        activity = client.get_activity(activity_id)
        return activity
    except Exception as e:
        print(f"Error fetching activity {activity_id}: {e}")
        return None


def save_activity(activity: Dict[str, Any]) -> bool:
    """Save an activity to a JSON file."""
    try:
        activity_id = str(activity.get("activityId", ""))
        start_time = activity.get("startTimeLocal", "")
        
        # Parse date from startTimeLocal (format: "2024-01-15 10:30:00")
        if start_time:
            date_str = start_time.split()[0]  # Get YYYY-MM-DD part
        else:
            date_str = datetime.now().strftime("%Y-%m-%d")
        
        filename = f"{date_str}_{activity_id}.json"
        filepath = ACTIVITIES_DIR / filename
        
        # Write activity data
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(activity, f, indent=2, ensure_ascii=False, default=str)
        
        return True
    except Exception as e:
        print(f"Error saving activity {activity.get('activityId', 'unknown')}: {e}")
        return False


def get_last_sync_date() -> Optional[datetime]:
    """Get the last sync date from last-sync.json."""
    if LAST_SYNC_FILE.exists():
        try:
            with open(LAST_SYNC_FILE, "r") as f:
                data = json.load(f)
                return datetime.fromisoformat(data.get("last_sync", ""))
        except Exception as e:
            print(f"Error reading last sync date: {e}")
    return None


def save_last_sync_date():
    """Save the current sync date to last-sync.json."""
    try:
        data = {
            "last_sync": datetime.now().isoformat(),
            "timestamp": datetime.now().timestamp()
        }
        with open(LAST_SYNC_FILE, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving last sync date: {e}")


def calculate_stats(activities: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Calculate aggregated statistics from activities."""
    if not activities:
        return {
            "total_activities": 0,
            "total_distance_km": 0,
            "total_time_seconds": 0,
            "average_pace_min_per_km": 0,
            "total_elevation_gain_m": 0,
            "total_calories": 0,
        }
    
    total_distance = sum(activity.get("distance", 0) or 0 for activity in activities)
    total_time = sum(activity.get("elapsedDuration", 0) or 0 for activity in activities)
    total_elevation = sum(activity.get("elevationGain", 0) or 0 for activity in activities)
    total_calories = sum(activity.get("calories", 0) or 0 for activity in activities)
    
    # Convert distance from meters to kilometers
    total_distance_km = total_distance / 1000
    
    # Calculate average pace (minutes per kilometer)
    average_pace = 0
    if total_distance_km > 0 and total_time > 0:
        average_pace = (total_time / 60) / total_distance_km
    
    # Find personal records
    prs = {
        "longest_distance_km": max((activity.get("distance", 0) or 0) / 1000 for activity in activities) if activities else 0,
        "fastest_pace_min_per_km": min(
            ((activity.get("elapsedDuration", 0) or 0) / 60) / ((activity.get("distance", 0) or 0) / 1000)
            for activity in activities
            if activity.get("distance", 0) and activity.get("distance", 0) > 0
        ) if activities else 0,
    }
    
    return {
        "total_activities": len(activities),
        "total_distance_km": round(total_distance_km, 2),
        "total_time_seconds": total_time,
        "total_time_hours": round(total_time / 3600, 2),
        "average_pace_min_per_km": round(average_pace, 2),
        "total_elevation_gain_m": round(total_elevation, 2),
        "total_calories": total_calories,
        "personal_records": prs,
        "last_updated": datetime.now().isoformat(),
    }


def load_existing_activities() -> List[Dict[str, Any]]:
    """Load all existing activity JSON files."""
    activities = []
    if not ACTIVITIES_DIR.exists():
        return activities
    
    for filepath in ACTIVITIES_DIR.glob("*.json"):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                activity = json.load(f)
                activities.append(activity)
        except Exception as e:
            print(f"Error loading {filepath}: {e}")
    
    return activities


def main():
    """Main function to fetch and save Garmin activities."""
    print("Starting Garmin data sync...")
    print(f"Data directory: {DATA_DIR}")
    
    # Authenticate
    client = get_garmin_client()
    if not client:
        sys.exit(1)
    
    # Get last sync date
    last_sync = get_last_sync_date()
    if last_sync:
        print(f"Last sync: {last_sync.strftime('%Y-%m-%d %H:%M:%S')}")
        start_date = last_sync
    else:
        print("No previous sync found, fetching last 365 days of activities")
        start_date = datetime.now() - timedelta(days=365)
    
    # Fetch activities
    print(f"Fetching activities from {start_date.strftime('%Y-%m-%d')}...")
    activities = fetch_running_activities(client, start_date)
    
    if not activities:
        print("No new activities found")
        save_last_sync_date()
        return
    
    # Load existing activities to avoid duplicates
    existing_activities = load_existing_activities()
    existing_ids = {str(act.get("activityId", "")) for act in existing_activities}
    
    # Save new activities
    new_count = 0
    updated_count = 0
    
    for activity in activities:
        activity_id = str(activity.get("activityId", ""))
        
        # Fetch detailed activity data
        detailed_activity = get_activity_details(client, activity_id)
        if detailed_activity:
            activity.update(detailed_activity)
        
        # Check if already exists
        if activity_id in existing_ids:
            # Update existing activity
            if save_activity(activity):
                updated_count += 1
        else:
            # New activity
            if save_activity(activity):
                new_count += 1
                existing_ids.add(activity_id)
    
    print(f"✓ Saved {new_count} new activities")
    print(f"✓ Updated {updated_count} existing activities")
    
    # Calculate and save statistics
    all_activities = load_existing_activities()
    stats = calculate_stats(all_activities)
    
    with open(STATS_FILE, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Updated statistics: {stats['total_activities']} activities, {stats['total_distance_km']} km total")
    
    # Save last sync date
    save_last_sync_date()
    
    print("✓ Sync completed successfully!")


if __name__ == "__main__":
    main()

