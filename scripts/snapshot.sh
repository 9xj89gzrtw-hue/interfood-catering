#!/usr/bin/env bash
# ============================================================
# SNAPSHOT — creates timestamped backup of all critical files
# Used before risky operations and at session start
# Snapshots are kept for 7 days, then auto-cleaned
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
BACKUP_BASE="$PROJECT_DIR/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LABEL="${1:-manual}"
BACKUP_DIR="$BACKUP_BASE/snap_${TIMESTAMP}_${LABEL}"

mkdir -p "$BACKUP_DIR"

# ── Save all source files ──
mkdir -p "$BACKUP_DIR/src/app" "$BACKUP_DIR/src/components" "$BACKUP_DIR/src/lib" "$BACKUP_DIR/src/hooks"

# App routes
if [ -d "src/app" ]; then
    find src/app -name "*.tsx" -o -name "*.ts" -o -name "*.css" | while read f; do
        mkdir -p "$BACKUP_DIR/$(dirname $f)"
        cp "$f" "$BACKUP_DIR/$f"
    done
fi

# Components
if [ -d "src/components" ]; then
    find src/components -name "*.tsx" -o -name "*.ts" | while read f; do
        mkdir -p "$BACKUP_DIR/$(dirname $f)"
        cp "$f" "$BACKUP_DIR/$f"
    done
fi

# Lib and hooks
for dir in src/lib src/hooks; do
    if [ -d "$dir" ]; then
        find $dir -name "*.ts" -o -name "*.tsx" | while read f; do
            mkdir -p "$BACKUP_DIR/$(dirname $f)"
            cp "$f" "$BACKUP_DIR/$f"
        done
    fi
done

# Config files
for f in package.json tailwind.config.ts tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs components.json .env Caddyfile; do
    [ -f "$PROJECT_DIR/$f" ] && cp "$PROJECT_DIR/$f" "$BACKUP_DIR/$f"
done

# Public assets (just list, don't copy heavy images)
if [ -d "public" ]; then
    find public -type f | sort > "$BACKUP_DIR/_public_manifest.txt"
fi

# Git info
git log --oneline -10 > "$BACKUP_DIR/_git_log.txt" 2>/dev/null || true
git rev-parse HEAD > "$BACKUP_DIR/_git_hash.txt" 2>/dev/null || true
git diff --stat HEAD > "$BACKUP_DIR/_git_diff.txt" 2>/dev/null || true

# Manifest
cat > "$BACKUP_DIR/manifest.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "label": "$LABEL",
  "git_hash": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "git_branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "files_count": $(find "$BACKUP_DIR/src" -type f 2>/dev/null | wc -l),
  "routes_count": $(find src/app -name "page.tsx" 2>/dev/null | wc -l),
  "components_count": $(find src/components -name "*.tsx" ! -path "*/ui/*" 2>/dev/null | wc -l)
}
EOF

echo "Snapshot saved: $BACKUP_DIR"

# ── Cleanup: keep snapshots for 7 days, max 20 snapshots ──
find "$BACKUP_BASE" -maxdepth 1 -type d -name "snap_*" -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
SNAP_COUNT=$(find "$BACKUP_BASE" -maxdepth 1 -type d -name "snap_*" | wc -l)
if [ "$SNAP_COUNT" -gt 20 ]; then
    ls -1dt "$BACKUP_BASE"/snap_* | tail -n +21 | xargs rm -rf 2>/dev/null || true
fi
