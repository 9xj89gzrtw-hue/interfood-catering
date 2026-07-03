#!/bin/bash
cd /home/z/my-project
while true; do
  bun run dev &
  PID=$!
  wait $PID 2>/dev/null
  sleep 2
done
