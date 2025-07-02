import { AuthenticateUserService } from "@/domain/usecases/authenticate-user";
import { Request, Response } from "express";
import { authenticateUserSchema } from "../dtos/authenticate-user.dto";


class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = authenticateUserSchema.parse(request.body);

    const authenticateUserService = new AuthenticateUserService();
    const sessionData = await authenticateUserService.execute({
      email,
      password,
    });
    return response.json(sessionData);
  }
}

export { SessionsController };
