# syntax=docker/dockerfile:1

# ---- Build stage ----------------------------------------------------------
# Compiles the Nuxt app. Nitro's node-server preset emits a self-contained
# bundle in /app/.output (its own node_modules included), so nothing from this
# stage except .output is needed at runtime.
FROM node:22-slim AS build
WORKDIR /app

# Install dependencies from the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Build the app (runs `nuxt build`).
COPY . .
RUN npm run build

# ---- Runtime stage --------------------------------------------------------
FROM node:22-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
# Cloud Run injects PORT (defaults to 8080); Nitro reads it automatically.
ENV PORT=8080
ENV HOST=0.0.0.0

# Copy only the compiled, self-contained server output.
COPY --from=build /app/.output ./.output

EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
