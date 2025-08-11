import express from "express";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";
import { PaymentController } from "../controllers/payment.controller";

const paymentRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentWebhook:
 *       type: object
 *       required:
 *         - paymentCode
 *         - status
 *       properties:
 *         paymentCode:
 *           type: string
 *           description: Código do pagamento
 *         status:
 *           type: string
 *           enum: [paid, canceled]
 *           description: Status do pagamento
 */
/** * @swagger
 * /webhook/payment:
 *   post:
 *     summary: Recebe notificações de status de pagamento
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentWebhook'
 *     responses:
 *       200:
 *         description: Status do pagamento atualizado com sucesso
 */
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
