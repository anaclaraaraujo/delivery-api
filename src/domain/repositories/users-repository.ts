import { prisma } from "@/infra/database/prisma";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UsersRepository {
  async findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  async create(data: CreateUserDTO) {
    return prisma.user.create({ data });
  }
}
