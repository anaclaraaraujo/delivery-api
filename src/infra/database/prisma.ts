import { PrismaClient } from "@prisma/client";
import { env, isTestEnv } from "@/env";

const databaseUrl = isTestEnv(env) ? env.DATABASE_URL_TEST : env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export { prisma };
