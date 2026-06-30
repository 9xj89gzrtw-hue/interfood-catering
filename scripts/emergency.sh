#!/usr/bin/env bash
# ============================================================
# EMERGENCY — nuclear option for total recovery
# Use when everything is broken and you need a clean state
# 1. Creates a snapshot of current state (just in case)
# 2. Hard resets to GitHub origin/main
# 3. Reinstalls everything
# 4. Rebuilds
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${RED}╔══════════════════════════════════════════════╗${NC}"
echo -e "${RED}║       EMERGENCY RECOVERY — LAST RESORT       ║${NC}"
echo -e "${RED}╚══════════════════════════════════════════════╝${NC}"
echo ""

# Save current state
echo -e "${YELLOW}[1/5]${NC} Saving current state..."
bash "$PROJECT_DIR/scripts/snapshot.sh" "emergency" 2>/dev/null || true
echo -e "${GREEN}  ✓ Snapshot saved${NC}"

# Kill any running processes
echo -e "${YELLOW}[2/5]${NC} Stopping all processes..."
kill $(lsof -t -i :3000) 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true
pkill -f "watcher.sh" 2>/dev/null || true
echo -e "${GREEN}  ✓ Processes stopped${NC}"

# Fetch and hard reset
echo -e "${YELLOW}[3/5]${NC} Resetting to GitHub version..."
git fetch origin main 2>/dev/null || {
    echo -e "${RED}  ✗ Cannot fetch from GitHub!${NC}"
    echo -e "  Trying to restore from latest snapshot..."
    bash "$PROJECT_DIR/scripts/restore.sh" latest
    exit 0
}
git checkout main 2>/dev/null || git checkout -b main 2>/dev/null
git reset --hard origin/main
echo -e "${GREEN}  ✓ Reset to GitHub version${NC}"

# Clean install
echo -e "${YELLOW}[4/5]${NC} Clean install..."
rm -rf node_modules/.cache 2>/dev/null || true
bun install 2>/dev/null
echo -e "${GREEN}  ✓ Dependencies installed${NC}"

# Build
echo -e "${YELLOW}[5/5]${NC} Building project..."
npx next build 2>&1 | tail -5
echo -e "${GREEN}  ✓ Build complete${NC}"

# Summary
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ EMERGENCY RECOVERY COMPLETE${NC}"
echo -e "  Run 'bash scripts/startup.sh' to start the server"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
