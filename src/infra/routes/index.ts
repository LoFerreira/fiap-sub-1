import express from "express";
import vehicleRoutes from "./vehicle.routes";
import paymentRoutes from "./payment.routes";
import { setupSwagger } from "../middlewares/swagger.middleware";

export const routes = (app: express.Express) => {
  app.use(express.json());

  setupSwagger(app);

  app.use(vehicleRoutes);
  app.use(paymentRoutes);
};
