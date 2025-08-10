import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { vehicle } from "../../domain/entities/vehicle.entity";
import { NotFoundError } from "../../domain/errors/not-found.error";

export class UpdateVehicleUseCase {
  private vehicleRepository: VehicleRepository;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async execute(id: string, vehicleData: Partial<vehicle>): Promise<vehicle> {
    const vehicle = await this.vehicleRepository.update(id, vehicleData);
    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }
    return vehicle;
  }
}
