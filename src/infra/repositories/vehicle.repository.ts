import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { vehicle } from "../../domain/entities/vehicle.entity";

export class VehicleRepository {
  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("vehicles");
  }

  async getAll(filter: string): Promise<vehicle[]> {
    let snapshot = [] as any;

    if (!filter) {
      snapshot = await this.collection.get();
    } else {
      const filterValue = filter === "available" ? false : true;
      snapshot = await this.collection.where("sold", "==", filterValue).get();
    }

    if (snapshot.empty) {
      return [];
    }

    const vehicles = snapshot.docs.map(
      (doc: any) => ({ id: doc.id, ...doc.data() } as vehicle)
    );
    return vehicles;
  }

  async getById(id: string): Promise<vehicle | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as vehicle;
  }

  async update(
    id: string,
    vehicleData: Partial<vehicle>
  ): Promise<vehicle | null> {
    const vehicleRef = this.collection.doc(id);
    const doc = await vehicleRef.get();

    if (!doc.exists) {
      return null;
    }

    await this.collection.doc(id).update(vehicleData);
    return { id, ...vehicleData } as vehicle;
  }

  async create(vehicleData: Partial<vehicle>): Promise<vehicle> {
    const docRef = await this.collection.add(vehicleData);
    return { id: docRef.id, ...vehicleData } as vehicle;
  }

  async sell(id: string, buyerCpf: string): Promise<vehicle | null> {
    const vehicleRef = this.collection.doc(id);
    const doc = await vehicleRef.get();

    if (!doc.exists) {
      return null;
    }

    await vehicleRef.update({
      sold: true,
      buyerCpf: buyerCpf,
      saleDate: new Date().toISOString(),
    });

    const vehicleUpdated = await vehicleRef.get();
    return { id, ...vehicleUpdated.data() } as vehicle;
  }
}
