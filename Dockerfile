# ─────────────────────────────────────────────────────────────
# NativeSmart Lab — Dockerfile
# Le Lab est un site statique : Node le construit, nginx le sert.
# Aucune variable ni aucun secret n'entre dans l'image.
# ─────────────────────────────────────────────────────────────

# ── Base ──────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# ── Build ─────────────────────────────────────────────────────
FROM base AS build-app
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod=false
RUN pnpm showcase:build

# ── Production ────────────────────────────────────────────────
# nginx sans privilèges : tourne en utilisateur nginx (101), écoute sur 8080.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS production
LABEL org.opencontainers.image.source="https://github.com/th1nkdev-io/nativesmart"
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build-app /app/apps/showcase/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/healthz || exit 1
