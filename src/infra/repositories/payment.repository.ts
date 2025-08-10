import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { payment } from "../../domain/entities/payment.entity";

export class PaymentRepository {
  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("sales");
  }

  async generatePaymentCode(
    vehicleId: string,
    buyerCpf: string
  ): Promise<payment | null> {
    const newSalesRef = await this.collection.doc();

    await newSalesRef.set({
      vehicleId,
      buyerCpf,
      saleDate: new Date().toISOString(),
      paymentStatus: "pending",
    });

    const saleUpdated = await newSalesRef.get();

    return { id: newSalesRef.id, ...saleUpdated.data() } as payment;
  }

  async updatePaymentStatus(
    paymentCode: string,
    status: string
  ): Promise<payment> {
    const paymentRef = this.collection.doc(paymentCode);
    await paymentRef.update({ paymentStatus: status });

    const updatedPayment = await paymentRef.get();
    return { id: updatedPayment.id, ...updatedPayment.data() } as payment;
  }

  async getById(paymentCode: string): Promise<payment | null> {
    const doc = await this.collection.doc(paymentCode).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as payment;
  }
}
