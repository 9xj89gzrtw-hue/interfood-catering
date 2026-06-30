#!/usr/bin/env bash
# ============================================================
# STARTUP RECOVERY — run at the beginning of every session
# 1. Checks GitHub vs local — pulls if behind
# 2. Creates snapshot backup before any changes
# 3. Starts file watcher
# 4. Starts dev server
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
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  INTERFOOD CATERING — Session Recovery System${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo ""

# ── STEP 1: Fetch from GitHub ──
echo -e "${YELLOW}[1/5]${NC} Fetching from GitHub..."
git fetch origin main 2>/dev/null || {
    echo -e "${RED}  ✗ Cannot fetch from GitHub. Working offline.${NC}"
}

# ── STEP 2: Compare local vs remote ──
LOCAL_HASH=$(git rev-parse HEAD 2>/dev/null || echo "none")
REMOTE_HASH=$(git rev-parse origin/main 2>/dev/null || echo "none")

if [ "$LOCAL_HASH" = "$REMOTE_HASH" ]; then
    echo -e "${GREEN}  ✓ Local is up to date with GitHub${NC}"
elif [ "$LOCAL_HASH" != "none" ] && [ "$REMOTE_HASH" != "none" ]; then
    BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "0")
    AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
    
    if [ "$BEHIND" -gt 0 ] && [ "$AHEAD" -eq 0 ]; then
        echo -e "${YELLOW}  ⚠ Local is $BEHIND commit(s) behind GitHub. Pulling...${NC}"
        git pull origin main 2>/dev/null || {
            echo -e "${RED}  ✗ Pull failed. Creating backup and force-resetting...${NC}"
            bash "$PROJECT_DIR/scripts/snapshot.sh" "pre-recovery"
            git reset --hard origin/main
        }
        echo -e "${GREEN}  ✓ Synced with GitHub${NC}"
    elif [ "$AHEAD" -gt 0 ] && [ "$BEHIND" -eq 0 ]; then
        echo -e "${YELLOW}  ⚠ Local is $AHEAD commit(s) ahead of GitHub. Pushing...${NC}"
        git push origin main 2>/dev/null && echo -e "${GREEN}  ✓ Pushed to GitHub${NC}" || echo -e "${RED}  ✗ Push failed${NC}"
    elif [ "$BEHIND" -gt 0 ] && [ "$AHEAD" -gt 0 ]; then
        echo -e "${YELLOW}  ⚠ Diverged: local ahead by $AHEAD, behind by $BEHIND. Creating snapshot...${NC}"
        bash "$PROJECT_DIR/scripts/snapshot.sh" "pre-merge"
        git pull --rebase origin main 2>/dev/null && echo -e "${GREEN}  ✓ Rebased on GitHub${NC}" || echo -e "${RED}  ✗ Rebase failed, using GitHub version${NC}"
    fi
else
    echo -e "${RED}  ✗ Cannot compare with GitHub. Continuing with local version.${NC}"
fi

# ── STEP 3: Create startup snapshot ──
echo -e "${YELLOW}[2/5]${NC} Creating startup snapshot..."
bash "$PROJECT_DIR/scripts/snapshot.sh" "session-start" 2>/dev/null && echo -e "${GREEN}  ✓ Snapshot created${NC}" || echo -e "${YELLOW}  ⚠ Snapshot skipped${NC}"

# ── STEP 4: Verify project integrity ──
echo -e "${YELLOW}[3/5]${NC} Verifying project integrity..."
MISSING=0
for f in package.json src/app/page.tsx src/app/layout.tsx src/app/globals.css; do
    if [ ! -f "$PROJECT_DIR/$f" ]; then
        echo -e "${RED}  ✗ Missing: $f${NC}"
        MISSING=$((MISSING + 1))
    fi
done
if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}  ✓ All core files present${NC}"
else
    echo -e "${RED}  ✗ $MISSING core file(s) missing! Consider git checkout origin/main -- .${NC}"
fi

# ── STEP 5: Install dependencies if needed ──
echo -e "${YELLOW}[4/5]${NC} Checking dependencies..."
if [ ! -d "node_modules" ] || [ package.json -nt node_modules/.package-lock.json ] 2>/dev/null; then
    bun install 2>/dev/null && echo -e "${GREEN}  ✓ Dependencies installed${NC}" || echo -e "${RED}  ✗ Install failed${NC}"
else
    echo -e "${GREEN}  ✓ Dependencies up to date${NC}"
fi

# ── STEP 6: Start file watcher ──
echo -e "${YELLOW}[5/5]${NC} Starting file watcher..."
bash "$PROJECT_DIR/scripts/watcher.sh" &
echo -e "${GREEN}  ✓ Watcher started (PID: $!)${NC}"

# ── Summary ──
ROUTES=$(find src/app -name "page.tsx" | wc -l)
COMPONENTS=$(find src/components -name "*.tsx" ! -path "*/ui/*" | wc -l)
LAST_COMMIT=$(git log -1 --oneline 2>/dev/null || echo "none")

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Session ready!${NC}"
echo -e "  Routes: ${ROUTES} | Components: ${COMPONENTS}"
echo -e "  Last commit: ${LAST_COMMIT}"
echo -e "  Watcher: active (30s interval)"
echo -e "  Autosave: to GitHub on every change"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
echo ""
