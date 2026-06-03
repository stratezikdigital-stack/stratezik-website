#!/usr/bin/env bash
# Live homepage + cache diagnostic (non-JS fetch ≈ crawler HTML).
set -euo pipefail

URL="${1:-https://www.stratezik.com/}"
BUST="${URL%/}/?cache_verify=$(date +%s)"

echo "=== Cache headers: $URL ==="
curl -sI "$URL" | grep -iE 'x-vercel-cache|age|cache-control|cdn-cache-control|etag|last-modified' || true

echo ""
echo "=== Body checks: $URL ==="
BODY=$(curl -sL "$URL")
echo "bytes: $(printf '%s' "$BODY" | wc -c | tr -d ' ')"
echo "noscript count: $(printf '%s' "$BODY" | grep -c '<noscript' || true)"
echo "FAQ: $(printf '%s' "$BODY" | grep -c 'Frequently asked questions' || true)"
echo "ai-agents link: $(printf '%s' "$BODY" | grep -c '/services/ai-agents' || true)"
echo "web-design link: $(printf '%s' "$BODY" | grep -c '/services/web-design' || true)"
echo "prerender footer: $(printf '%s' "$BODY" | grep -c 'Integrated channels · accountable measurement' || true)"
echo "stale footer: $(printf '%s' "$BODY" | grep -c 'All rights reserved' || true)"
echo "stale Our Services: $(printf '%s' "$BODY" | grep -c 'Our Services' || true)"

echo ""
echo "=== Cache-buster: $BUST ==="
curl -sI "$BUST" | grep -iE 'x-vercel-cache|age|cache-control' || true
BUST_BODY=$(curl -sL "$BUST")
echo "prerender footer: $(printf '%s' "$BUST_BODY" | grep -c 'Integrated channels · accountable measurement' || true)"
