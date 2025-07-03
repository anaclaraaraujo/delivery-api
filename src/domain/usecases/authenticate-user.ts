import { AppError } from "@/shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { authenticateUserSchema } from "@/infra/http/dtos/authenticate-user.dto";

export class AuthenticateUserService {
  private usersRepository = new UsersRepository();

  async execute(data: any) {
    const { email, password } = authenticateUserSchema.parse(data);

    const user = await this.usersRepository.findByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
  }
}
