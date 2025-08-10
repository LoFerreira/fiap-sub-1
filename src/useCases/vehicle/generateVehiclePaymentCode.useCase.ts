import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { CreatePaymentUseCase } from "../payment/createPayment.useCase";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { AlreadySoldError } from "../../domain/errors/already-sold.error";

export class GenerateVehiclePaymentCodeUseCase {
  private vehicleRepository: VehicleRepository;
  private createPaymentUseCase: CreatePaymentUseCase;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
    this.createPaymentUseCase = new CreatePaymentUseCase();
  }

  async execute(id: string, buyerCpf: string) {
    const existingVehicle = await this.vehicleRepository.getById(id);

    if (!existingVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (existingVehicle.sold) {
      throw new AlreadySoldError("Vehicle already sold");
    }

    const paymentData = await this.createPaymentUseCase.execute(id, buyerCpf);

    return { paymentData };
  }
}
