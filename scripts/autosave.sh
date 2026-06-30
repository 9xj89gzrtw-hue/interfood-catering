#!/usr/bin/env bash
# ============================================================
# AUTOSAVE — auto-commit + push every change to GitHub
# Runs via file watcher or cron. Never loses work again.
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

# Check if there are any changes (staged, unstaged, or untracked)
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    exit 0  # Nothing to commit
fi

# Generate timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Add everything
git add -A

# Smart commit message based on what changed
CHANGED_FILES=$(git diff --cached --name-only)
CHANGED_COUNT=$(echo "$CHANGED_FILES" | wc -l)

# Detect what kind of changes
if echo "$CHANGED_FILES" | grep -q "src/app/"; then
    SCOPE="pages"
elif echo "$CHANGED_FILES" | grep -q "src/components/"; then
    SCOPE="components"
elif echo "$CHANGED_FILES" | grep -q "globals.css"; then
    SCOPE="styles"
elif echo "$CHANGED_FILES" | grep -q "scripts/"; then
    SCOPE="infra"
else
    SCOPE="misc"
fi

COMMIT_MSG="autosave(${SCOPE}): ${TIMESTAMP} — ${CHANGED_COUNT} file(s)"

# Commit
git commit -m "$COMMIT_MSG" --allow-empty-message 2>/dev/null || true

# Push via safe-push (handles credentials gracefully)
bash "$PROJECT_DIR/scripts/safe-push.sh" 2>/dev/null || true

echo "[$(date)] Autosave committed: $COMMIT_MSG" >> "$PROJECT_DIR/.autosave.log"
