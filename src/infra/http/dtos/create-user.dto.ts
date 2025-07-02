import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
