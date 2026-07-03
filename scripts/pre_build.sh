#!/bin/bash
# ═══════════════════════════════════════════════
# Pre-build hook: auto-backup before next build
# Prevents version loss during rebuilds
# Installed as: next.config.ts -> experimental -> buildTriggers
# ═══════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/auto_backup.sh" "pre-build-$(date +%Y%m%d%H%M%S)"
