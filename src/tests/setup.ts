import { execSync } from "child_process";
import { prisma } from "@/infra/database/prisma";

beforeAll(() => {
  try {
    execSync("npx prisma migrate deploy --schema=./prisma/schema.prisma", {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Erro ao rodar as migrations no ambiente de teste:", err);
    process.exit(1);
  }
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
