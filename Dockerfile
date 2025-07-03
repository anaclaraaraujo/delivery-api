# ---- Base Stage ----
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN apt-get update -y && apt-get install -y openssl libssl-dev
RUN npm install --omit=dev
COPY prisma ./prisma/
RUN npx prisma generate

# ---- Build Stage ----
FROM base AS build
RUN apt-get update -y && apt-get install -y openssl libssl-dev
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-slim AS production
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl libssl-dev
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/prisma ./prisma
COPY --from=build /app/dist ./dist
EXPOSE 3333
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

# ---- Tests Stage ----
FROM dependencies AS test
WORKDIR /app
RUN npm install
COPY . .
CMD ["npm", "run", "test:dev"]
