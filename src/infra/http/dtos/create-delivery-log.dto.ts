import { z } from "zod";

export const createDeliveryLogSchema = z.object({
  delivery_id: z.string().uuid(),
  description: z.string().min(1),
});

export type CreateDeliveryLogDTO = z.infer<typeof createDeliveryLogSchema>;
