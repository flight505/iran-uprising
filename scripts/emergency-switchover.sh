#!/bin/bash
set -euo pipefail

# Emergency Domain Switchover Script
# Usage: ./scripts/emergency-switchover.sh [new-domain]
# Requires: VERCEL_TOKEN env var, SSH access to VPS

NEW_DOMAIN="${1:-}"
VPS_HOST="deploy@89.127.232.97"
ONION="einjz5dwp2vztvqni5hf6wthy5izdokfw4d2fgr53t5yy3rzdci55zqd.onion"

if [ -z "$NEW_DOMAIN" ]; then
  echo "Usage: $0 <new-domain>"
  echo "Example: $0 iran-uprising.se"
  exit 1
fi

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: VERCEL_TOKEN environment variable is required"
  exit 1
fi

echo "=== EMERGENCY DOMAIN SWITCHOVER to ${NEW_DOMAIN} ==="
echo ""

# Step 1: Verify DNS resolves
echo "[1/4] Verifying DNS for ${NEW_DOMAIN}..."
if ! dig +short "${NEW_DOMAIN}" @9.9.9.9 | head -1; then
  echo "WARNING: DNS not resolving yet. Continue anyway? (y/N)"
  read -r confirm
  [ "$confirm" = "y" ] || exit 1
fi

# Step 2: Add domain to Vercel
echo "[2/4] Adding domain to Vercel..."
vercel domains add "${NEW_DOMAIN}" --token "${VERCEL_TOKEN}"

# Step 3: Update API CORS on VPS
echo "[3/4] Updating API CORS on VPS..."
ssh "${VPS_HOST}" "cd /opt/iran-memorial && \
  sed -i 's/iran-uprising.com/${NEW_DOMAIN}/g' .env && \
  docker compose restart"

# Step 4: Verify
echo "[4/4] Verifying..."
sleep 5
curl -sI "https://${NEW_DOMAIN}" | head -5

echo ""
echo "=== SWITCHOVER COMPLETE ==="
echo "New domain: https://${NEW_DOMAIN}"
echo "Onion backup always at: http://${ONION}"
