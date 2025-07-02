import express from "express";
import "express-async-errors";

import { routes } from "./infra/http/routes";
import { errorHandling } from "./infra/http/middlewares/error-handling";

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandling);

export { app };
