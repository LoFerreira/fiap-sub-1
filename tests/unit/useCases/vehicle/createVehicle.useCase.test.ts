import { CreateVehicleUseCase } from "../../../../src/useCases/vehicle/createVehicle.useCase";
import { MockVehicleRepository } from "../../../mocks/vehicle.repository.mock";
import { vehicle } from "../../../../src/domain/entities/vehicle.entity";

jest.mock("../../../../src/infra/repositories/vehicle.repository", () => {
  return {
    VehicleRepository: jest
      .fn()
      .mockImplementation(() => new MockVehicleRepository()),
  };
});

describe("CreateVehicleUseCase", () => {
  let useCase: CreateVehicleUseCase;
  let mockRepository: MockVehicleRepository;

  beforeEach(() => {
    useCase = new CreateVehicleUseCase();
    mockRepository = (useCase as any)
      .vehicleRepository as MockVehicleRepository;
    mockRepository.reset();
  });

  describe("execute", () => {
    it("should create a new vehicle successfully", async () => {
      const vehicleData: Partial<vehicle> = {
        brand: "Volkswagen",
        model: "Golf",
        year: 2023,
        color: "Blue",
        price: 35000,
        sold: false,
      };

      const result = await useCase.execute(vehicleData);

      expect(result).toMatchObject({
        id: "3",
        brand: "Volkswagen",
        model: "Golf",
        year: 2023,
        color: "Blue",
        price: 35000,
        sold: false,
      });
    });

    it("should create vehicle with default sold value as false", async () => {
      const vehicleData: Partial<vehicle> = {
        brand: "Ford",
        model: "Focus",
        year: 2022,
        color: "Red",
        price: 30000,
      };

      const result = await useCase.execute(vehicleData);

      expect(result.sold).toBe(false);
    });

    it("should create vehicle with optional fields", async () => {
      const vehicleData: Partial<vehicle> = {
        brand: "Chevrolet",
        model: "Onix",
        year: 2022,
        color: "White",
        price: 25000,
        sold: true,
        buyerCpf: "123.456.789-00",
        saleDate: "2024-08-11",
      };

      const result = await useCase.execute(vehicleData);

      expect(result).toMatchObject({
        brand: "Chevrolet",
        model: "Onix",
        year: 2022,
        color: "White",
        price: 25000,
        sold: true,
        buyerCpf: "123.456.789-00",
        saleDate: "2024-08-11",
      });
    });
  });
});
