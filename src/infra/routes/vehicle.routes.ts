import express from "express";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";
import { vehicleSchema } from "../../domain/entities/vehicle.entity";
import { VehicleController } from "../controllers/vehicle.controller";

const vehicleRoutes = express.Router();

vehicleRoutes.get(
  "/vehicles",
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string().valid("sold", "available").optional(),
    },
  }),
  expressAsyncHandler(VehicleController.getAll)
);
vehicleRoutes.post(
  "/vehicles",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.create)
);
vehicleRoutes.put(
  "/vehicles/:id",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.update)
);
vehicleRoutes.post(
  "/vehicles/:id/sell",
  expressAsyncHandler(VehicleController.sell)
);

export default vehicleRoutes;
