import { Router } from "express";
import { methods as medicoController } from "../controllers/medico.controller.js";
const router = Router();
router.get("/", medicoController.getMedicos);
export default router;