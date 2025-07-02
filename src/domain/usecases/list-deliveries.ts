import { DeliveriesRepository } from "@/domain/repositories/deliveries-repository";

export class ListDeliveriesService {
  private deliveriesRepo = new DeliveriesRepository();

  async execute(userId: string) {
    return this.deliveriesRepo.listAllWithUser(userId);
  }
}
