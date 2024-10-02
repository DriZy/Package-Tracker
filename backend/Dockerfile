# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/app.js"]

# Optional: Add a test stage (for CI/CD pipelines)
FROM node:20-alpine AS test

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "test"]