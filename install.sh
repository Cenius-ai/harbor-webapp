#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== Harbor: Installing dependencies ==="
npm install --no-audit --no-fund

echo ""
echo "=== Harbor: Build complete ==="
echo "Run the dev server with: npm run dev"
echo "Or generate a static site with: npm run generate"
