import { PaymentRepository } from "../../infra/repositories/payment.repository";
import { UpdatePaymentStatusUseCase } from "./updatePaymentStatus.useCase";
import { MarkVehicleAsSoldUseCase } from "../vehicle/markVehicleAsSold.useCase";
import { NotFoundError } from "../../domain/errors/not-found.error";

export class HandlePaymentWebhookUseCase {
  private paymentRepository: PaymentRepository;
  private updatePaymentStatusUseCase: UpdatePaymentStatusUseCase;
  private markVehicleAsSoldUseCase: MarkVehicleAsSoldUseCase;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase();
    this.markVehicleAsSoldUseCase = new MarkVehicleAsSoldUseCase();
  }

  async execute(paymentCode: string, status: string) {
    const paymentData = await this.paymentRepository.getById(paymentCode);

    if (!paymentData) {
      throw new NotFoundError("Payment not found");
    }

    if (status === "paid") {
      await this.markVehicleAsSoldUseCase.execute(
        paymentData.vehicleId,
        paymentData.buyerCpf
      );

      await this.updatePaymentStatusUseCase.execute(paymentCode, "paid");
    } else if (status === "canceled") {
      await this.updatePaymentStatusUseCase.execute(paymentCode, "canceled");
    }

    return { message: `Payment status updated to ${status}` };
  }
}
