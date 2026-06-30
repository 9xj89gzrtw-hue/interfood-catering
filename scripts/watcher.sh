#!/usr/bin/env bash
# ============================================================
# FILE WATCHER — monitors src/ for changes and triggers autosave
# Runs in background. Starts automatically with dev server.
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
WATCH_DIRS="src/ scripts/ public/"
INTERVAL=30  # seconds between checks
PIDFILE="$PROJECT_DIR/.watcher.pid"
LOGFILE="$PROJECT_DIR/.watcher.log"

# Kill existing watcher if running
if [ -f "$PIDFILE" ]; then
    OLD_PID=$(cat "$PIDFILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        kill "$OLD_PID" 2>/dev/null || true
    fi
    rm -f "$PIDFILE"
fi

# Write our PID
echo $$ > "$PIDFILE"

# Cleanup on exit
cleanup() {
    rm -f "$PIDFILE"
    echo "[$(date)] Watcher stopped" >> "$LOGFILE"
    exit 0
}
trap cleanup EXIT INT TERM

echo "[$(date)] Watcher started (PID: $$, interval: ${INTERVAL}s)" >> "$LOGFILE"

# Track last known hash of file tree
LAST_HASH=""

while true; do
    # Get quick hash of all watched files
    CURRENT_HASH=$(find $WATCH_DIRS -type f -newer "$PROJECT_DIR/.last_autosave" 2>/dev/null | sort | md5sum 2>/dev/null || echo "none")
    
    if [ "$CURRENT_HASH" != "$LAST_HASH" ] && [ "$CURRENT_HASH" != "" ]; then
        echo "[$(date)] Changes detected, running autosave..." >> "$LOGFILE"
        bash "$PROJECT_DIR/scripts/autosave.sh" >> "$LOGFILE" 2>&1 || true
        touch "$PROJECT_DIR/.last_autosave"
        LAST_HASH="$CURRENT_HASH"
    fi
    
    sleep $INTERVAL
done
