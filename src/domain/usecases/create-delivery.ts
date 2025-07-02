import { DeliveriesRepository } from "@/domain/repositories/deliveries-repository";
import {
  createDeliverySchema,
  type CreateDeliveryDTO,
} from "@/infra/http/dtos/create-delivery.dto";

export class CreateDeliveryService {
  private deliveriesRepo = new DeliveriesRepository();

  async execute(data: CreateDeliveryDTO) {
    const { user_id, description } = createDeliverySchema.parse(data);

    await this.deliveriesRepo.create({
      userId: user_id,
      description,
    });
  }
}
