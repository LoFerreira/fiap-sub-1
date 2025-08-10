import express from "express";
import vehicleRoutes from "./vehicle.routes";
import paymentRoutes from "./payment.routes";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(vehicleRoutes);
  app.use(paymentRoutes);
};
