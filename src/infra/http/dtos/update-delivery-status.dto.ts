import { z } from "zod";

export const updateDeliveryStatusSchema = z.object({
  id: z.string().uuid(),
});

export const updateDeliveryStatusBodySchema = z.object({
  status: z.enum(["processing", "shipped", "delivered"]),
});

export type UpdateDeliveryStatusDTO = z.infer<
  typeof updateDeliveryStatusSchema
>;
export type UpdateDeliveryStatusBodyDTO = z.infer<
  typeof updateDeliveryStatusBodySchema
>;
