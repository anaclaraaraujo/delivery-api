import { prisma } from "@/infra/database/prisma";

interface CreateLogDTO {
  deliveryId: string;
  description: string;
}

export class DeliveryLogsRepository {
  async create(data: CreateLogDTO) {
    return prisma.deliveryLog.create({ data });
  }
}
