import { z } from "zod";

export const showDeliveryLogsSchema = z.object({
  delivery_id: z.string().uuid(),
});

export type ShowDeliveryLogsDTO = z.infer<typeof showDeliveryLogsSchema>;
