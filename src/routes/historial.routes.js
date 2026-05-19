import { Router } from "express";
import { methods as historialController } from "../controllers/historial.controller.js";
const router = Router();
router.get("/", historialController.getHistoriales);
export default router;