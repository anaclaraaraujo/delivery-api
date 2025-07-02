import { prisma } from "@/infra/database/prisma";

interface CreateDeliveryInput {
  userId: string;
  description: string;
}

export class DeliveriesRepository {
  async create(data: CreateDeliveryInput) {
    return prisma.delivery.create({ data });
  }

  async listAllWithUser(userId: string) {
    return prisma.delivery.findMany({
      where: { userId },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.delivery.findUnique({ where: { id } });
  }

  async findByIdWithUserAndLogs(id: string) {
    return prisma.delivery.findUnique({
      where: { id },
      include: { logs: true, user: true },
    });
  }

  async updateStatus(
    id: string,
    status: "processing" | "shipped" | "delivered"
  ) {
    return prisma.delivery.update({
      where: { id },
      data: { status },
    });
  }
}
