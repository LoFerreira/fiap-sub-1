import express from "express";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";
import { PaymentController } from "../controllers/payment.controller";

const paymentRoutes = express.Router();

paymentRoutes.post(
  "/webhook/payment",
  celebrate({
    [Segments.BODY]: {
      paymentCode: Joi.string().required(),
      status: Joi.string().valid("paid", "canceled").required(),
    },
  }),
  expressAsyncHandler(PaymentController.handlePaymentWebhook)
);

export default paymentRoutes;
