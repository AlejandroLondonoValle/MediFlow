import express from "express";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "./config.js";
import citaRoutes from "./routes/cita.routes.js";
import cors from "cors";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MediFlow - Sistema de Clínica",
      version: "1.0.0",
      description:
        "API REST para el sistema de gestión de citas médicas (MediFlow)."
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Servidor local"
      }
    ]
  },
  apis: ["./src/routes/*.js", "./dist/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();

app.set("port", config.port);

app.use(cors({
  origin: "*" // Permite cualquier origen (Live Server, file://, etc) en entorno de desarrollo
}));

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API MediFlow activa"
  });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import authRoutes from "./routes/auth.routes.js";
import pacienteRoutes from "./routes/paciente.routes.js";
import medicoRoutes from "./routes/medico.routes.js";
import historialRoutes from "./routes/historial.routes.js";

// Rutas de MediFlow
app.use("/api/auth", authRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/historial", historialRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

export default app;
