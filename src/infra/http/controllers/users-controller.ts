import { Request, Response } from "express";
import { createUserSchema } from "../dtos/create-user.dto";
import { CreateUserService } from "@/domain/usecases/create-user";

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = createUserSchema.parse(request.body);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  }
}

export { UsersController };
