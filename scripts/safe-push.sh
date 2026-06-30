#!/usr/bin/env bash
# ============================================================
# SAFE PUSH — push to GitHub with retry and fallback
# If push fails, saves a pending-push marker so next session
# with valid credentials can push the accumulated commits
# ============================================================
set -euo pipefail

PROJECT_DIR="/home/z/my-project"
PENDING_DIR="$PROJECT_DIR/.pending-push"

cd "$PROJECT_DIR"

# Try to push
if git push origin main 2>/dev/null; then
    echo "[$(date)] Push successful" >> "$PROJECT_DIR/.autosave.log"
    # Clean up any pending markers
    rm -rf "$PENDING_DIR" 2>/dev/null
    exit 0
fi

# Push failed — save pending state
echo "[$(date)] Push FAILED — saving pending state" >> "$PROJECT_DIR/.autosave.log"
mkdir -p "$PENDING_DIR"

# Save current commit hash
git rev-parse HEAD > "$PENDING_DIR/latest_commit.txt"
echo "$(date)" > "$PENDING_DIR/timestamp.txt"
git log --oneline -5 > "$PENDING_DIR/recent_commits.txt"

# Count commits ahead of origin
AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
echo "$AHEAD commits ahead of origin/main" > "$PENDING_DIR/status.txt"

echo ""
echo "⚠ PUSH FAILED — GitHub credentials not configured"
echo "  $AHEAD commit(s) waiting to be pushed"
echo "  Pending state saved to .pending-push/"
echo ""
echo "To fix: set GitHub credentials and run:"
echo "  bash scripts/safe-push.sh"
echo ""
echo "Or set a Personal Access Token:"
echo "  git remote set-url origin https://<TOKEN>@github.com/9xj89gzrtw-hue/interfood-catering.git"
