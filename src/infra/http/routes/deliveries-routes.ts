import { Router } from "express";

import { DeliveriesController } from "@/infra/http/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/infra/http/controllers/deliveries-status-controller";

import { ensureAuthenticated } from "@/infra/http/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/infra/http/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveriesController.create
);
deliveriesRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveriesController.index
);
deliveriesRoutes.patch(
  "/:id/status",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveriesStatusController.update
);

export { deliveriesRoutes };
