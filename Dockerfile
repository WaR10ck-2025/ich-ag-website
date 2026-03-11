# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# More memory for Node.js on low-RAM devices (e.g. Umbrel/Raspberry Pi)
ENV NODE_OPTIONS="--max_old_space_size=512"

# Install dependencies first (layer cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
# TypeScript is checked locally; skip tsc in Docker to avoid OOM on ARM devices
COPY . .
RUN npx vite build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
