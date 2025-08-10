import { HandlePaymentWebhookUseCase } from "../../useCases/payment/handlePaymentWebhook.useCase";
import { Request, Response } from "express";

export class PaymentController {
  static async handlePaymentWebhook(req: Request, res: Response) {
    const { paymentCode, status } = req.body;

    const handlePaymentWebhookUseCase = new HandlePaymentWebhookUseCase();
    const payment = await handlePaymentWebhookUseCase.execute(
      paymentCode,
      status
    );

    res.status(200).send(payment);
  }
}
