import { AppError } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { createUserSchema } from "@/infra/http/dtos/create-user.dto";

export class CreateUserService {
  private usersRepository = new UsersRepository();

  async execute(data: any) {
    const { name, email, password } = createUserSchema.parse(data);

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User with same email already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
