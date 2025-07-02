import { UpdateDeliveryStatusService } from "@/domain/usecases/update-delivery";
import { Request, Response } from "express";
import { type UpdateDeliveryStatusDTO, updateDeliveryStatusSchema, type UpdateDeliveryStatusBodyDTO, updateDeliveryStatusBodySchema } from "../dtos/update-delivery-status.dto";


class DeliveriesStatusController {
  async update(request: Request, response: Response) {
    const service = new UpdateDeliveryStatusService();

    const params: UpdateDeliveryStatusDTO = updateDeliveryStatusSchema.parse(
      request.params
    );

    const body: UpdateDeliveryStatusBodyDTO =
      updateDeliveryStatusBodySchema.parse(request.body);

    await service.execute(params, body);

    return response.status(204).send();
  }
}

export { DeliveriesStatusController };
