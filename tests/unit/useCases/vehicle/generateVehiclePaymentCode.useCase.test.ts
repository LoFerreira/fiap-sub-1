import { GenerateVehiclePaymentCodeUseCase } from "../../../../src/useCases/vehicle/generateVehiclePaymentCode.useCase";
import { MockVehicleRepository } from "../../../mocks/vehicle.repository.mock";
import { MockPaymentRepository } from "../../../mocks/payment.repository.mock";
import { NotFoundError } from "../../../../src/domain/errors/not-found.error";
import { AlreadySoldError } from "../../../../src/domain/errors/already-sold.error";

jest.mock("../../../../src/infra/repositories/vehicle.repository", () => {
  return {
    VehicleRepository: jest
      .fn()
      .mockImplementation(() => new MockVehicleRepository()),
  };
});

jest.mock("../../../../src/infra/repositories/payment.repository", () => {
  return {
    PaymentRepository: jest
      .fn()
      .mockImplementation(() => new MockPaymentRepository()),
  };
});

describe("GenerateVehiclePaymentCodeUseCase", () => {
  let useCase: GenerateVehiclePaymentCodeUseCase;
  let mockVehicleRepository: MockVehicleRepository;
  let mockPaymentRepository: MockPaymentRepository;

  beforeEach(() => {
    useCase = new GenerateVehiclePaymentCodeUseCase();
    mockVehicleRepository = (useCase as any)
      .vehicleRepository as MockVehicleRepository;
    mockPaymentRepository = new MockPaymentRepository();

    mockVehicleRepository.reset();
    mockPaymentRepository.clear();
  });

  describe("execute", () => {
    it("should generate payment code for available vehicle", async () => {
      const vehicleId = "1";
      const buyerCpf = "123.456.789-00";

      const result = await useCase.execute(vehicleId, buyerCpf);

      expect(result).toHaveProperty("paymentData");
      expect(result.paymentData).toMatchObject({
        id: expect.stringContaining("payment-"),
        vehicleId: vehicleId,
        buyerCpf: buyerCpf,
        saleDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        paymentStatus: "pending",
      });
    });

    it("should throw NotFoundError when vehicle does not exist", async () => {
      const nonExistentVehicleId = "999";
      const buyerCpf = "123.456.789-00";

      await expect(
        useCase.execute(nonExistentVehicleId, buyerCpf)
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw NotFoundError with correct message for non-existent vehicle", async () => {
      await expect(
        useCase.execute("invalid-id", "123.456.789-00")
      ).rejects.toThrow("Vehicle not found");
    });

    it("should throw AlreadySoldError when vehicle is already sold", async () => {
      const vehicleId = "1";
      const soldVehicleData = {
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "White",
        price: 50000,
        sold: true,
        buyerCpf: "previous-buyer-cpf",
        saleDate: "2024-08-10",
      };

      await mockVehicleRepository.update(vehicleId, soldVehicleData);

      await expect(
        useCase.execute(vehicleId, "123.456.789-00")
      ).rejects.toThrow(AlreadySoldError);
    });

    it("should throw AlreadySoldError with correct message", async () => {
      await mockVehicleRepository.update("1", { sold: true });

      await expect(useCase.execute("1", "123.456.789-00")).rejects.toThrow(
        "Vehicle already sold"
      );
    });

    it("should create payment with correct vehicle and buyer information", async () => {
      const vehicleId = "2";
      const buyerCpf = "987.654.321-00";

      const result = await useCase.execute(vehicleId, buyerCpf);

      expect(result.paymentData).not.toBeNull();
      expect(result.paymentData!.vehicleId).toBe(vehicleId);
      expect(result.paymentData!.buyerCpf).toBe(buyerCpf);
      expect(result.paymentData!.paymentStatus).toBe("pending");
    });

    it("should create payment with today's date", async () => {
      const today = new Date().toISOString().split("T")[0];
      const vehicleId = "1";
      const buyerCpf = "111.222.333-44";

      const result = await useCase.execute(vehicleId, buyerCpf);

      expect(result.paymentData).not.toBeNull();
      expect(result.paymentData!.saleDate).toBe(today);
    });

    it("should generate unique payment IDs for different requests", async () => {
      const payment1 = await useCase.execute("1", "123.456.789-00");
      const payment2 = await useCase.execute("2", "987.654.321-00");

      expect(payment1.paymentData).not.toBeNull();
      expect(payment2.paymentData).not.toBeNull();
      expect(payment1.paymentData!.id).not.toBe(payment2.paymentData!.id);
    });
  });
});
