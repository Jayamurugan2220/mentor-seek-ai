# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --production=false

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Expose port
ENV PORT=5000
EXPOSE 5000

# Start
CMD ["node", "dist/server.js"]
