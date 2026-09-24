#!/usr/bin/env bash
# Builds the static export and publishes it to the gh-pages branch of `origin`.
set -euo pipefail

REPO_NAME="$(basename -s .git "$(git remote get-url origin)")"
REMOTE="$(git remote get-url origin)"

PAGES_BASE_PATH="/${REPO_NAME}" npx next build

cd out
touch .nojekyll # keep GitHub Pages from hiding the _next/ folder
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$REMOTE" gh-pages
rm -rf .git
