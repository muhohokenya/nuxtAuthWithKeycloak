# Stage 1: Build
FROM node:18-alpine as builder
LABEL authors="jeremy"
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy application code and build (if necessary)
COPY . .
# Uncomment if you have a build step
# RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

# Default command to run the application
CMD ["npm", "run", "prod"]