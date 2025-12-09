import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST - E-commerce",
      version: "1.0.0",
      description: "Documentación completa de la API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../docs/*.swagger.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger disponible en http://localhost:3000/api/docs");
  }
};
