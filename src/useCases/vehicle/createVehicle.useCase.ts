import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { vehicle } from "../../domain/entities/vehicle.entity";

export class CreateVehicleUseCase {
  private vehicleRepository: VehicleRepository;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async execute(vehicleData: Partial<vehicle>): Promise<vehicle> {
    return this.vehicleRepository.create(vehicleData);
  }
}
