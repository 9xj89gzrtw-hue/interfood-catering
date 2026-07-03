#!/bin/bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════
# ensure-server.sh — Гарантированно запускает dev-сервер
#
# Проблема: Ручной запуск `bun run dev &` убивается через ~15с,
# потому что процесс привязан к shell-сессии, которая завершается.
#
# Решение: Использовать системный init-fullstack.sh, который
# запускает .zscripts/dev.sh через sudo -u z, и процессы
# становятся детьми PID 1 (init/tini), что гарантирует их
# выживание.
#
# Использование:
#   bash /home/z/my-project/scripts/ensure-server.sh
# ═══════════════════════════════════════════════════════════════

PROJECT_DIR="/home/z/my-project"
LOG_FILE="$PROJECT_DIR/server-status.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] === ensure-server.sh started ===" | tee -a "$LOG_FILE"

# Step 1: Check if server is already running
if curl -s --connect-timeout 2 --max-time 5 http://localhost:3000/ > /dev/null 2>&1; then
    echo "✅ Сервер уже работает на порту 3000" | tee -a "$LOG_FILE"
    echo "   Preview: https://preview-chat-f10d9fd7-2a0b-46d1-a80c-e38f0b5aaffe.space-z.ai/"
    exit 0
fi

echo "❌ Сервер не отвечает. Запускаю через системный скрипт..." | tee -a "$LOG_FILE"

# Step 2: Use the ONLY reliable method to start the server
# The init-fullstack.sh script runs .zscripts/dev.sh as user z,
# which properly detaches processes (PPID=1, survives shell exit)
curl -s https://z-cdn.chatglm.cn/fullstack/init-fullstack.sh | bash 2>&1 | tee -a "$LOG_FILE"

# Step 3: Wait for server to be ready (up to 60 seconds)
echo "⏳ Ждём запуска сервера..." | tee -a "$LOG_FILE"
for i in $(seq 1 60); do
    if curl -s --connect-timeout 2 --max-time 5 http://localhost:3000/ > /dev/null 2>&1; then
        echo "✅ Сервер запущен! (попытка $i)" | tee -a "$LOG_FILE"
        echo "   Preview: https://preview-chat-f10d9fd7-2a0b-46d1-a80c-e38f0b5aaffe.space-z.ai/"
        exit 0
    fi
    sleep 1
done

echo "❌ Не удалось запустить сервер за 60 секунд" | tee -a "$LOG_FILE"
echo "   Проверьте лог: $LOG_FILE"
exit 1
