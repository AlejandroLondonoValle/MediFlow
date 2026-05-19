import { Router } from "express";
import { methods as pacienteController } from "../controllers/paciente.controller.js";
const router = Router();
router.get("/", pacienteController.getPacientes);
export default router;