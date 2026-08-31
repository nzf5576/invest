#!/usr/bin/env bash
# Builds the app and deploys it to the S3 + CloudFront hosting set up for this project.
set -euo pipefail

BUCKET="invest-portal-072032502208"
DISTRIBUTION_ID="E2PX22HF6DRYTC"

cd "$(dirname "$0")/.."

npm run build

aws s3 cp dist/assets/ "s3://$BUCKET/assets/" --recursive --cache-control "public, max-age=31536000, immutable"
aws s3 cp dist/index.html "s3://$BUCKET/index.html" --cache-control "no-cache, must-revalidate"
aws s3 cp dist/favicon.svg "s3://$BUCKET/favicon.svg" --cache-control "no-cache, must-revalidate"
aws s3 cp dist/icons.svg "s3://$BUCKET/icons.svg" --cache-control "no-cache, must-revalidate"

# Remove any files that no longer exist in the new build (keeps old hashed asset
# bundles from piling up; index.html/icons are re-uploaded above so this is safe).
aws s3 sync dist/ "s3://$BUCKET/" --delete --cache-control "no-cache, must-revalidate" --exclude "assets/*"

aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/index.html" "/"

echo "Deployed. Live at https://d3t5gxfct74tle.cloudfront.net"
