#!/bin/bash
# Deploy tunnel script - tries multiple methods to expose the local server
set -e

echo "=== Starting tunnel deployment ==="

# Method 1: Cloudflared
echo "Trying cloudflared..."
if ! [ -f /tmp/cloudflared ]; then
  curl -sL --connect-timeout 30 --max-time 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 2>/dev/null || true
  if [ -f /tmp/cloudflared ]; then
    chmod +x /tmp/cloudflared
  fi
fi

if [ -f /tmp/cloudflared ]; then
  echo "cloudflared downloaded, starting tunnel..."
  /tmp/cloudflared tunnel --url http://localhost:3000 > /tmp/cf-tunnel.log 2>&1 &
  CF_PID=$!
  echo "cloudflared PID: $CF_PID"
  sleep 20
  CF_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/cf-tunnel.log 2>/dev/null | head -1)
  if [ -n "$CF_URL" ]; then
    echo "SUCCESS: Cloudflare tunnel URL: $CF_URL"
    echo "PUBLIC_URL=$CF_URL" > /home/z/my-project/download/deploy-info.txt
    echo "METHOD=cloudflared" >> /home/z/my-project/download/deploy-info.txt
    echo "DEPLOYED_AT=$(date -u +%FT%TZ)" >> /home/z/my-project/download/deploy-info.txt
    echo "$CF_URL"
    exit 0
  else
    echo "cloudflared started but no URL found in log:"
    cat /tmp/cf-tunnel.log
  fi
else
  echo "cloudflared download failed"
fi

# Method 2: LocalTunnel
echo "Trying localtunnel..."
cd /home/z/my-project
npx -y localtunnel --port 3000 > /tmp/lt-tunnel.log 2>&1 &
LT_PID=$!
echo "localtunnel PID: $LT_PID"
sleep 15
LT_URL=$(grep -oP 'https://[a-z0-9-]+\.loca\.lt' /tmp/lt-tunnel.log 2>/dev/null | head -1)
if [ -n "$LT_URL" ]; then
  echo "SUCCESS: LocalTunnel URL: $LT_URL"
  echo "PUBLIC_URL=$LT_URL" > /home/z/my-project/download/deploy-info.txt
  echo "METHOD=localtunnel" >> /home/z/my-project/download/deploy-info.txt
  echo "DEPLOYED_AT=$(date -u +%FT%TZ)" >> /home/z/my-project/download/deploy-info.txt
  echo "$LT_URL"
  exit 0
else
  echo "localtunnel started but no URL found in log:"
  cat /tmp/lt-tunnel.log
fi

# Method 3: Bore
echo "Trying bore..."
if ! [ -f /tmp/bore ]; then
  curl -sL --connect-timeout 30 --max-time 60 -o /tmp/bore https://github.com/ekzhang/bore/releases/latest/download/bore-x86_64-unknown-linux-musl 2>/dev/null || true
  if [ -f /tmp/bore ]; then
    chmod +x /tmp/bore
  fi
fi

if [ -f /tmp/bore ]; then
  /tmp/bore local 3000 --to bore.pub > /tmp/bore-tunnel.log 2>&1 &
  BORE_PID=$!
  echo "bore PID: $BORE_PID"
  sleep 10
  BORE_URL=$(grep -oP 'https://[a-z0-9-]+\.bore\.pub' /tmp/bore-tunnel.log 2>/dev/null | head -1)
  if [ -n "$BORE_URL" ]; then
    echo "SUCCESS: Bore tunnel URL: $BORE_URL"
    echo "PUBLIC_URL=$BORE_URL" > /home/z/my-project/download/deploy-info.txt
    echo "METHOD=bore" >> /home/z/my-project/download/deploy-info.txt
    echo "DEPLOYED_AT=$(date -u +%FT%TZ)" >> /home/z/my-project/download/deploy-info.txt
    echo "$BORE_URL"
    exit 0
  else
    echo "bore log:"
    cat /tmp/bore-tunnel.log
  fi
fi

# Method 4: Vercel
echo "Trying Vercel CLI..."
npm install -g vercel 2>/dev/null || true
cd /home/z/my-project
vercel --yes --prod 2>&1 | tee /tmp/vercel.log | head -30
VERCEL_URL=$(grep -oP 'https://[a-z0-9-]+\.vercel\.app' /tmp/vercel.log 2>/dev/null | head -1)
if [ -n "$VERCEL_URL" ]; then
  echo "SUCCESS: Vercel URL: $VERCEL_URL"
  echo "PUBLIC_URL=$VERCEL_URL" > /home/z/my-project/download/deploy-info.txt
  echo "METHOD=vercel" >> /home/z/my-project/download/deploy-info.txt
  echo "DEPLOYED_AT=$(date -u +%FT%TZ)" >> /home/z/my-project/download/deploy-info.txt
  echo "$VERCEL_URL"
  exit 0
fi

echo "ALL METHODS FAILED"
echo "PUBLIC_URL=NONE" > /home/z/my-project/download/deploy-info.txt
echo "METHOD=failed" >> /home/z/my-project/download/deploy-info.txt
exit 1
