#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

RUN_DATE="${1:-$(date +%F)}"

python3 scripts/update_daily_site_questions.py --date "$RUN_DATE"

git add site/data/questions.js

if git diff --cached --quiet; then
  echo "No website question changes for $RUN_DATE"
  exit 0
fi

git commit -m "Update daily WUST question set $RUN_DATE"

GIT_SSH_COMMAND='ssh -i ~/.ssh/wust_entrance_study_site -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git push
