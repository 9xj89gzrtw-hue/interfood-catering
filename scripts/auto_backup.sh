#!/bin/bash
# ═══════════════════════════════════════════════
# Nilov Catering — Auto-backup Script
# Prevents version loss by saving snapshots
# Run: ./scripts/auto_backup.sh [description]
# ═══════════════════════════════════════════════

PROJECT_DIR="/home/z/my-project"
BACKUP_DIR="$PROJECT_DIR/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DESC="${1:-manual}"
VERSION_FILE="$PROJECT_DIR/.version"

# Read current version number
if [ -f "$VERSION_FILE" ]; then
  VERSION=$(cat "$VERSION_FILE")
  VERSION=$((VERSION + 1))
else
  VERSION=1
fi

# Save version number
echo "$VERSION" > "$VERSION_FILE"

# Create backup directory with version and timestamp
SNAP_DIR="$BACKUP_DIR/v${VERSION}_${TIMESTAMP}_${DESC}"
mkdir -p "$SNAP_DIR"

echo "═══ Nilov Catering Backup v$VERSION ═══"
echo "Description: $DESC"
echo "Timestamp: $(date -Iseconds)"

# Save critical source files
cp "$PROJECT_DIR/src/app/page.tsx" "$SNAP_DIR/page.tsx" 2>/dev/null
cp "$PROJECT_DIR/src/app/globals.css" "$SNAP_DIR/globals.css" 2>/dev/null
cp "$PROJECT_DIR/src/app/layout.tsx" "$SNAP_DIR/layout.tsx" 2>/dev/null

# Save git commit hash if available
cd "$PROJECT_DIR"
git rev-parse HEAD > "$SNAP_DIR/git_head.txt" 2>/dev/null || echo "no-git" > "$SNAP_DIR/git_head.txt"

# Save manifest
cat > "$SNAP_DIR/manifest.json" << EOF
{
  "version": $VERSION,
  "timestamp": "$(date -Iseconds)",
  "description": "$DESC",
  "git_head": "$(cat "$SNAP_DIR/git_head.txt")",
  "files": ["page.tsx", "globals.css", "layout.tsx"]
}
EOF

# Auto-commit to git (if repo exists)
if [ -d "$PROJECT_DIR/.git" ]; then
  cd "$PROJECT_DIR"
  git add -A
  git commit -m "auto-backup-v${VERSION}: ${DESC}" --allow-empty 2>/dev/null
  echo "Git commit: auto-backup-v${VERSION}"
fi

# Count backups
BACKUP_COUNT=$(ls -1d "$BACKUP_DIR"/v* 2>/dev/null | wc -l)
echo "Total backups: $BACKUP_COUNT"
echo "Backup saved: $SNAP_DIR"
echo "═══ Done ═══"
