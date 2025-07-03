import { z } from "zod";

const baseSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

const testSchema = baseSchema.extend({
  DATABASE_URL_TEST: z.string().url(),
});

type BaseEnv = z.infer<typeof baseSchema>;
type TestEnv = z.infer<typeof testSchema>;

export const env: BaseEnv | TestEnv =
  process.env.NODE_ENV === "test"
    ? testSchema.parse(process.env)
    : baseSchema.parse(process.env);

export function isTestEnv(env: BaseEnv | TestEnv): env is TestEnv {
  return (env as TestEnv).DATABASE_URL_TEST !== undefined;
}
