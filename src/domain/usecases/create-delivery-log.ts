import { AppError } from "@/shared/errors/AppError";
import { DeliveriesRepository } from "@/domain/repositories/deliveries-repository";
import { DeliveryLogsRepository } from "@/domain/repositories/delivery-logs-repository";
import type { CreateDeliveryLogDTO } from "@/infra/http/dtos/create-delivery-log.dto";

export class CreateDeliveryLogService {
  private deliveriesRepo = new DeliveriesRepository();
  private logsRepo = new DeliveryLogsRepository();

  async execute({ delivery_id, description }: CreateDeliveryLogDTO) {
    const delivery = await this.deliveriesRepo.findById(delivery_id);

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    if (delivery.status === "delivered") {
      throw new AppError("This order has already been delivered");
    }

    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped");
    }

    await this.logsRepo.create({
      deliveryId: delivery_id,
      description,
    });
  }
}
