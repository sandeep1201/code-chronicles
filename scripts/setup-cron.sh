#!/bin/bash
# Setup script to add a cron job for syncing Garmin data
# This will run the sync script daily at 6 AM

# Get the absolute path to the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PYTHON_SCRIPT="$PROJECT_DIR/scripts/fetch-garmin-data.py"

# Find Python 3 (works on both Mac and Linux)
PYTHON3=$(which python3)
if [ -z "$PYTHON3" ]; then
    echo "Error: python3 not found in PATH"
    exit 1
fi

# Check if virtual environment exists, use it if available
if [ -d "$PROJECT_DIR/venv" ]; then
    VENV_PYTHON="$PROJECT_DIR/venv/bin/python"
    echo "✓ Found virtual environment, will use: $VENV_PYTHON"
    PYTHON_CMD="cd $PROJECT_DIR && source venv/bin/activate && python $PYTHON_SCRIPT"
else
    PYTHON_CMD="cd $PROJECT_DIR && $PYTHON3 $PYTHON_SCRIPT"
fi

# Create a temporary cron entry
# Note: Using full path to python3 and absolute paths for reliability
CRON_JOB="0 6 * * * $PYTHON_CMD >> $PROJECT_DIR/logs/garmin-sync.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$PYTHON_SCRIPT"; then
    echo "⚠️  Cron job already exists for Garmin sync"
    echo ""
    echo "Current cron jobs:"
    crontab -l | grep "$PYTHON_SCRIPT"
    echo ""
    echo "To update, first remove the existing job with: crontab -e"
else
    # Add the cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Successfully added daily cron job to sync Garmin data at 6 AM"
    echo ""
    echo "📋 Useful commands:"
    echo "  View cron jobs:    crontab -l"
    echo "  Edit cron jobs:    crontab -e"
    echo "  View sync logs:    tail -f $PROJECT_DIR/logs/garmin-sync.log"
    echo ""
    echo "🕐 The sync will run daily at 6:00 AM"
    echo "💡 To change the time, edit with: crontab -e"
fi

