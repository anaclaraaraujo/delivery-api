import { CreateDeliveryService } from "@/domain/usecases/create-delivery";
import { ListDeliveriesService } from "@/domain/usecases/list-deliveries";
import { Request, Response } from "express";
import { createDeliverySchema } from "../dtos/create-delivery.dto";

class DeliveriesController {
  async create(request: Request, response: Response) {
    const data = createDeliverySchema.parse(request.body);

    const service = new CreateDeliveryService();
    await service.execute(data);

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const service = new ListDeliveriesService();
    const deliveries = await service.execute(userId);

    return response.json(deliveries);
  }
}

export { DeliveriesController };
