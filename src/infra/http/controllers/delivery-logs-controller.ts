import { CreateDeliveryLogService } from "@/domain/usecases/create-delivery-log";
import { ShowDeliveryLogsService } from "@/domain/usecases/show-delivery-logs";
import { Request, Response } from "express";
import { createDeliveryLogSchema } from "../dtos/create-delivery-log.dto";
import { showDeliveryLogsSchema } from "../dtos/show-delivery-logs.dto";


class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const data = createDeliveryLogSchema.parse(request.body);

    const service = new CreateDeliveryLogService();
    await service.execute(data);

    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const params = showDeliveryLogsSchema.parse(request.params);

    const service = new ShowDeliveryLogsService();
    const delivery = await service.execute(params, request.user);

    return response.json(delivery);
  }
}

export { DeliveryLogsController };
