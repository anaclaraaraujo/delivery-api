# ---- Base Stage ----
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies

# Instala OpenSSL antes do npm install pra Prisma não reclamar
RUN apt-get update -y && apt-get install -y openssl libssl-dev

RUN npm install --omit=dev
COPY prisma ./prisma/

RUN npx prisma generate

# ---- Build Stage ----
FROM base AS build

# Também instala OpenSSL antes do npm install na build (caso precise)
RUN apt-get update -y && apt-get install -y openssl libssl-dev

RUN npm install
COPY . .

RUN npm run build

# ---- Production Stage ----
FROM node:20-slim AS production
WORKDIR /app

# Instala OpenSSL pro runtime (geralmente não necessário, mas é seguro deixar)
RUN apt-get update -y && apt-get install -y openssl libssl-dev

# Copia dependências de produção e Prisma Client
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/prisma ./prisma

# Copia build final
COPY --from=build /app/dist ./dist

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
