#!/usr/bin/env bash
# ============================================================
# RESTORE — recover project from a snapshot or GitHub
# Usage: bash scripts/restore.sh [snapshot_label|github]
# Examples:
#   bash scripts/restore.sh github
#   bash scripts/restore.sh session-start
#   bash scripts/restore.sh pre-recovery
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
BACKUP_BASE="$PROJECT_DIR/backups"
SOURCE="${1:-github}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}═══ RESTORE MODE ═══${NC}"
echo -e "Source: ${SOURCE}"
echo ""

# Create pre-restore snapshot
bash "$PROJECT_DIR/scripts/snapshot.sh" "pre-restore" 2>/dev/null || true

if [ "$SOURCE" = "github" ]; then
    echo -e "${YELLOW}Restoring from GitHub (origin/main)...${NC}"
    git fetch origin main 2>/dev/null || {
        echo -e "${RED}Cannot fetch from GitHub!${NC}"
        exit 1
    }
    git checkout main 2>/dev/null || true
    git reset --hard origin/main
    echo -e "${GREEN}✓ Restored from GitHub${NC}"
    
elif [ "$SOURCE" = "latest" ]; then
    # Find latest snapshot
    LATEST=$(ls -1dt "$BACKUP_BASE"/snap_* 2>/dev/null | head -1)
    if [ -z "$LATEST" ]; then
        echo -e "${RED}No snapshots found!${NC}"
        exit 1
    fi
    echo -e "${YELLOW}Restoring from latest snapshot: $(basename $LATEST)${NC}"
    
    # Copy source files back
    if [ -d "$LATEST/src" ]; then
        cp -r "$LATEST/src/"* "$PROJECT_DIR/src/" 2>/dev/null || true
    fi
    
    # Copy config files
    for f in package.json tailwind.config.ts tsconfig.json next.config.ts .env; do
        [ -f "$LATEST/$f" ] && cp "$LATEST/$f" "$PROJECT_DIR/$f"
    done
    
    echo -e "${GREEN}✓ Restored from snapshot${NC}"
    
else
    # Find snapshot by label
    FOUND=$(ls -1dt "$BACKUP_BASE"/snap_*"${SOURCE}"* 2>/dev/null | head -1)
    if [ -z "$FOUND" ]; then
        echo -e "${RED}No snapshot with label '${SOURCE}' found!${NC}"
        echo -e "Available snapshots:"
        ls -1t "$BACKUP_BASE"/snap_* 2>/dev/null | while read d; do
            LABEL=$(cat "$d/manifest.json" 2>/dev/null | grep -o '"label": *"[^"]*"' | head -1 || echo "unknown")
            echo "  $(basename $d) — $LABEL"
        done
        exit 1
    fi
    
    echo -e "${YELLOW}Restoring from: $(basename $FOUND)${NC}"
    if [ -d "$FOUND/src" ]; then
        cp -r "$FOUND/src/"* "$PROJECT_DIR/src/" 2>/dev/null || true
    fi
    for f in package.json tailwind.config.ts tsconfig.json next.config.ts .env; do
        [ -f "$FOUND/$f" ] && cp "$FOUND/$f" "$PROJECT_DIR/$f"
    done
    echo -e "${GREEN}✓ Restored from snapshot${NC}"
fi

# Reinstall if needed
echo ""
echo -e "${YELLOW}Reinstalling dependencies...${NC}"
bun install 2>/dev/null && echo -e "${GREEN}✓ Dependencies installed${NC}" || echo -e "${RED}✗ Install failed${NC}"

echo ""
echo -e "${GREEN}═══ RESTORE COMPLETE ═══${NC}"
echo "Run 'bash scripts/startup.sh' to verify and start the dev server."
