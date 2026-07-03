#!/bin/bash
# ═══════════════════════════════════════════════
# Nilov Catering — Auto-Backup Script
# Prevents loss of work by creating versioned snapshots
# Usage: bash /home/z/my-project/scripts/backup.sh [commit_message]
# ═══════════════════════════════════════════════

set -e
cd /home/z/my-project

# Get current version from latest git tag or default
CURRENT_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0")
VERSION_NUM=${CURRENT_TAG#v}
NEXT_VERSION=$((VERSION_NUM + 1))
NEXT_TAG="v${NEXT_VERSION}"

# Commit message
MSG="${1:-auto-backup: ${NEXT_TAG}}"

echo "═══ Nilov Catering Backup Script ═══"
echo "Current version: ${CURRENT_TAG}"
echo "Next version:    ${NEXT_TAG}"
echo ""

# 1. Git add & commit
echo "📦 Staging files..."
git add -A

if git diff --cached --quiet; then
  echo "✅ No changes to commit. Already up to date."
else
  echo "💾 Committing changes..."
  git commit -m "${MSG}"
  echo "✅ Committed: ${MSG}"
fi

# 2. Create git tag
echo "🏷️  Creating tag ${NEXT_TAG}..."
git tag -a "${NEXT_TAG}" -m "${NEXT_TAG}: ${MSG}"
echo "✅ Tagged: ${NEXT_TAG}"

# 3. Export static HTML snapshot to download/
echo "📄 Generating static HTML snapshot..."
BUILD_DIR=".next"
if [ ! -d "${BUILD_DIR}" ]; then
  echo "⚠️  No build found. Building..."
  npx next build 2>&1 | tail -5
fi

# Copy the static export if available
SNAPSHOT_FILE="/home/z/my-project/download/nilov_catering_${NEXT_TAG}.html"
if [ -f "/home/z/my-project/.next/server/app/index.html" ]; then
  cp /home/z/my-project/.next/server/app/index.html "${SNAPSHOT_FILE}"
  echo "✅ Snapshot saved: ${SNAPSHOT_FILE}"
else
  echo "⚠️  Static HTML not found in build. Skipping snapshot."
fi

# 4. List all tags for reference
echo ""
echo "📋 Version history:"
git tag -l --sort=-version:refname | head -10

echo ""
echo "═══ Backup Complete: ${NEXT_TAG} ═══"
