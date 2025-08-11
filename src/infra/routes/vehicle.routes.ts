import express from "express";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";
import { vehicleSchema } from "../../domain/entities/vehicle.entity";
import { VehicleController } from "../controllers/vehicle.controller";

const vehicleRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - year
 *         - color
 *         - price
 *       properties:
 *         brand:
 *           type: string
 *           description: Marca do veículo
 *         model:
 *           type: string
 *           description: Modelo do veículo
 *         year:
 *           type: number
 *           description: Ano do veículo
 *         color:
 *           type: string
 *           description: Cor do veículo
 *         price:
 *           type: number
 *           description: Preço do veículo
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Lista todos os veículos
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [sold, available]
 *         description: Filtrar veículos por status
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
vehicleRoutes.get(
  "/vehicles",
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string().valid("sold", "available").optional(),
    },
  }),
  expressAsyncHandler(VehicleController.getAll)
);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dados inválidos
 */
vehicleRoutes.post(
  "/vehicles",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.create)
);
/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Atualiza um veículo existente
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 */
vehicleRoutes.put(
  "/vehicles/:id",
  celebrate({ [Segments.BODY]: vehicleSchema }),
  expressAsyncHandler(VehicleController.update)
);
/**
 * @swagger
 * /vehicles/{id}/sell:
 *   post:
 *     summary: Gera código de pagamento para venda de veículo
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo a ser vendido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerCpf:
 *                 type: string
 *                 description: CPF do comprador
 *     responses:
 *       200:
 *         description: Código de pagamento gerado com sucesso
 */
vehicleRoutes.post(
  "/vehicles/:id/sell",
  expressAsyncHandler(VehicleController.sell)
);

export default vehicleRoutes;
