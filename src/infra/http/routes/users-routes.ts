import { Router } from "express";

import { UsersController } from "@/infra/http/controllers/users-controller";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

export { usersRoutes };
