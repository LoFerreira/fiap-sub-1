import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "FIAP Substitutiva fase-2 API",
    version: "1.0.0",
    description: "API para gerenciamento de veículos e pagamentos",
    contact: {
      name: "Leonardo Ferreira",
      email: "leonardo10sp@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desenvolvimento",
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    "./src/infra/routes/*.ts",
    "./src/infra/controllers/*.ts",
    "./src/domain/entities/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
