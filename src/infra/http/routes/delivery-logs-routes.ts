import { Router } from "express";

import { DeliveryLogsController } from "@/infra/http/controllers/delivery-logs-controller";

import { ensureAuthenticated } from "@/infra/http/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/infra/http/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);

export { deliveryLogsRoutes };
