import { AppError } from "@/shared/errors/AppError";
import { DeliveriesRepository } from "@/domain/repositories/deliveries-repository";
import type { ShowDeliveryLogsDTO } from "@/infra/http/dtos/show-delivery-logs.dto";

export class ShowDeliveryLogsService {
  private deliveriesRepo = new DeliveriesRepository();

  async execute(params: ShowDeliveryLogsDTO, user: any) {
    const { delivery_id } = params;

    const delivery = await this.deliveriesRepo.findByIdWithUserAndLogs(
      delivery_id
    );

    if (user?.role === "customer" && user.id !== delivery?.userId) {
      throw new AppError("The user can only view their deliveries", 401);
    }

    return delivery;
  }
}
