import { citaService } from "../services/cita.service.js";

const handleError = (res, error) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: "Error interno del servidor" });
};

const getCitas = async (req, res) => {
  try {
    const data = await citaService.getCitas();
    return res.json({ data });
  } catch (error) {
    return handleError(res, error);
  }
};

const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await citaService.getCitaById(id);
    return res.json({ data });
  } catch (error) {
    return handleError(res, error);
  }
};

const getCitasPorMedico = async (req, res) => {
  try {
    const { idMedico } = req.params;
    const data = await citaService.getCitasPorMedico(idMedico);
    return res.json({ data });
  } catch (error) {
    return handleError(res, error);
  }
};

const agendarCita = async (req, res) => {
  try {
    const citaGuardada = await citaService.agendarCita(req.body);
    return res.status(201).json({ 
      message: "Cita agendada correctamente",
      data: citaGuardada 
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const resultado = await citaService.cambiarEstado(id, estado);
    return res.json({
      message: `Cita marcada como ${estado}`,
      data: resultado
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const methods = {
  getCitas,
  getCitaById,
  getCitasPorMedico,
  agendarCita,
  cambiarEstado
};
