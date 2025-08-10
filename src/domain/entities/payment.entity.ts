import { Joi } from "celebrate";

export type payment = {
  id: string;
  vehicleId: string;
  buyerCpf: string;
  saleDate: string;
  paymentStatus: string;
};

export const paymentSchema = Joi.object({
  vehicleId: Joi.string().required(),
  buyerCpf: Joi.string().required(),
  saleDate: Joi.string().required(),
  paymentStatus: Joi.string().valid("pending", "paid", "canceled").required(),
});
