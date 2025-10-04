#!/bin/sh
set -e

echo "Running Prisma migrations (deploy) ..."
npx prisma migrate deploy

echo "Starting Next.js standalone server ..."
exec node server.js
