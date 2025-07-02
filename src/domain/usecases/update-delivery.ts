import { DeliveriesRepository } from "@/domain/repositories/deliveries-repository";
import { DeliveryLogsRepository } from "@/domain/repositories/delivery-logs-repository";
import type {
  UpdateDeliveryStatusDTO,
  UpdateDeliveryStatusBodyDTO,
} from "@/infra/http/dtos/update-delivery-status.dto";

export class UpdateDeliveryStatusService {
  private deliveriesRepo = new DeliveriesRepository();
  private logsRepo = new DeliveryLogsRepository();

  async execute(
    params: UpdateDeliveryStatusDTO,
    body: UpdateDeliveryStatusBodyDTO
  ) {
    const { id } = params;
    const { status } = body;

    await this.deliveriesRepo.updateStatus(id, status);
    await this.logsRepo.create({
      deliveryId: id,
      description: status,
    });
  }
}
