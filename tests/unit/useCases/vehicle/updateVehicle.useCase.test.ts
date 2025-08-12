import { UpdateVehicleUseCase } from "../../../../src/useCases/vehicle/updateVehicle.useCase";
import { MockVehicleRepository } from "../../../mocks/vehicle.repository.mock";
import { vehicle } from "../../../../src/domain/entities/vehicle.entity";

jest.mock("../../../../src/infra/repositories/vehicle.repository", () => {
  return {
    VehicleRepository: jest
      .fn()
      .mockImplementation(() => new MockVehicleRepository()),
  };
});

describe("UpdateVehicleUseCase", () => {
  let useCase: UpdateVehicleUseCase;
  let mockRepository: MockVehicleRepository;

  beforeEach(() => {
    useCase = new UpdateVehicleUseCase();
    mockRepository = (useCase as any)
      .vehicleRepository as MockVehicleRepository;
    mockRepository.reset();
  });

  describe("execute", () => {
    it("should update an existing vehicle successfully", async () => {
      const updateData: Partial<vehicle> = {
        year: 2024,
        color: "Silver",
        price: 55000,
      };

      const result = await useCase.execute("1", updateData);

      expect(result).toMatchObject({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2024,
        color: "Silver",
        price: 55000,
        sold: false,
      });
    });

    it("should throw error when vehicle does not exist", async () => {
      const updateData: Partial<vehicle> = {
        price: 55000,
      };

      await expect(useCase.execute("999", updateData)).rejects.toThrow(
        "Vehicle not found"
      );
    });

    it("should update only provided fields", async () => {
      const updateData: Partial<vehicle> = {
        price: 60000,
      };

      const result = await useCase.execute("1", updateData);

      expect(result).toMatchObject({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "White",
        price: 60000,
        sold: false,
      });
    });
  });
});
