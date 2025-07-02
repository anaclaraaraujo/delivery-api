import { z } from "zod";

export const createDeliverySchema = z.object({
  user_id: z.string().uuid(),
  description: z.string(),
});

export type CreateDeliveryDTO = z.infer<typeof createDeliverySchema>;
