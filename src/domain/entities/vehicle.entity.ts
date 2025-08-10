import { Joi } from "celebrate";

export type vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  sold: boolean;
  buyerCpf?: string;
  saleDate?: string;
};

export const vehicleSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().required(),
  color: Joi.string().required(),
  price: Joi.number().required(),
  sold: Joi.boolean().default(false),
  buyerCpf: Joi.string().optional(),
  saleDate: Joi.string().optional(),
});
