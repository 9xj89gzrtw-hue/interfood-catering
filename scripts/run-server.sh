#!/bin/bash
cd /home/z/my-project
# Start Next.js dev server
bun run dev &
DEV_PID=$!
echo "Next.js PID: $DEV_PID"

# Wait for it to start
sleep 8

# Test it
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 10 http://127.0.0.1:3000/ 2>/dev/null || echo "000")
echo "Initial health check: HTTP $HTTP_CODE"

# Keep the script running by waiting for the dev process
wait $DEV_PID 2>/dev/null
