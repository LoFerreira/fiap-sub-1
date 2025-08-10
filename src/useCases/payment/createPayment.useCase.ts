import { PaymentRepository } from "../../infra/repositories/payment.repository";
import { payment } from "../../domain/entities/payment.entity";

export class CreatePaymentUseCase {
  private paymentRepository: PaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async execute(vehicleId: string, buyerCpf: string): Promise<payment | null> {
    const paymentData = await this.paymentRepository.generatePaymentCode(
      vehicleId,
      buyerCpf
    );

    return paymentData;
  }
}
