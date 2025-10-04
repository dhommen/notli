# Multi-stage build for Next.js + Prisma
FROM node:20-alpine AS base
WORKDIR /app

# System deps sometimes required for Prisma engines
RUN apk add --no-cache libc6-compat openssl

# --- Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- Generate Prisma Client ---
FROM deps AS prisma_gen
COPY prisma ./prisma
RUN npx prisma generate

# --- Build ---
FROM prisma_gen AS builder
COPY . .
RUN npm run build

# --- Runtime ---
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy standalone server output and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 3000

# Run prisma migrate deploy on startup, then start the standalone server
ENTRYPOINT ["/bin/sh", "/app/docker-entrypoint.sh"]
