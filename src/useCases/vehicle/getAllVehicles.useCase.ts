import { VehicleRepository } from "../../infra/repositories/vehicle.repository";
import { vehicle } from "../../domain/entities/vehicle.entity";

export class GetAllVehiclesUseCase {
  private vehicleRepository: VehicleRepository;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async execute(filter: string): Promise<vehicle[]> {
    return this.vehicleRepository.getAll(filter);
  }
}
