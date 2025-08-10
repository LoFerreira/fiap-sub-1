import { Request, Response } from "express";
import { vehicle } from "../../domain/entities/vehicle.entity";
import { GetAllVehiclesUseCase } from "../../useCases/vehicle/getAllVehicles.useCase";
import { CreateVehicleUseCase } from "../../useCases/vehicle/createVehicle.useCase";
import { UpdateVehicleUseCase } from "../../useCases/vehicle/updateVehicle.useCase";
import { GenerateVehiclePaymentCodeUseCase } from "../../useCases/vehicle/generateVehiclePaymentCode.useCase";

export class VehicleController {
  static async getAll(req: Request, res: Response) {
    const { filter } = req.query;

    const getAllVehiclesUseCase = new GetAllVehiclesUseCase();
    const vehicles = await getAllVehiclesUseCase.execute(filter as string);

    res.status(200).send(vehicles);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const vehicleData: vehicle = req.body;

    const updateVehicleUseCase = new UpdateVehicleUseCase();
    const updatedVehicle = await updateVehicleUseCase.execute(id, vehicleData);

    res.status(200).send({
      message: `Vehicle with id ${id} updated successfully`,
      vehicle: updatedVehicle,
    });
  }

  static async create(req: Request, res: Response) {
    const vehicleData: vehicle = req.body;

    const createVehicleUseCase = new CreateVehicleUseCase();
    const vehicle = await createVehicleUseCase.execute(vehicleData);

    res.status(201).send({ message: "Vehicle created successfully", vehicle });
  }

  static async sell(req: Request, res: Response) {
    const { id } = req.params;
    const { buyerCpf } = req.body;

    const generateVehiclePaymentCodeUseCase =
      new GenerateVehiclePaymentCodeUseCase();
    const { paymentData } = await generateVehiclePaymentCodeUseCase.execute(
      id,
      buyerCpf
    );

    res.status(200).send({
      message: `Generated payment code for vehicle with id ${id}`,
      paymentData,
    });
  }
}
