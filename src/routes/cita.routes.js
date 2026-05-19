import { Router } from "express";
import { methods as citaController } from "../controllers/cita.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Gestión de Citas Médicas
 */

/**
 * @swagger
 * /api/citas:
 *   get:
 *     tags: [Citas]
 *     summary: Obtener todas las citas
 *     responses:
 *       200:
 *         description: Lista de citas
 */
router.get("/", citaController.getCitas);

/**
 * @swagger
 * /api/citas/{id}:
 *   get:
 *     tags: [Citas]
 *     summary: Obtener una cita por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cita encontrada
 *       404:
 *         description: Cita no encontrada
 */
router.get("/:id", citaController.getCitaById);

/**
 * @swagger
 * /api/citas/medico/{idMedico}:
 *   get:
 *     tags: [Citas]
 *     summary: Obtener citas por médico
 *     parameters:
 *       - in: path
 *         name: idMedico
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de citas del médico
 */
router.get("/medico/:idMedico", citaController.getCitasPorMedico);

/**
 * @swagger
 * /api/citas:
 *   post:
 *     tags: [Citas]
 *     summary: Agendar una nueva cita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMedico:
 *                 type: string
 *               idPaciente:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               horaInicio:
 *                 type: string
 *               horaFin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cita agendada exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       409:
 *         description: Conflicto de horario
 */
router.post("/", citaController.agendarCita);

/**
 * @swagger
 * /api/citas/{id}/estado:
 *   patch:
 *     tags: [Citas]
 *     summary: Cambiar el estado de una cita
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, confirmada, cancelada, atendida]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch("/:id/estado", citaController.cambiarEstado);

export default router;
