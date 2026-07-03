#!/bin/bash
while true; do
  cd /home/z/my-project
  node .next/standalone/server.js
  echo "[$(date)] Server crashed, restarting..." >> /home/z/my-project/crash.log
  sleep 2
done
