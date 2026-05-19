import { pacienteService } from "../services/paciente.service.js";
const handleError = (res, error) => res.status(error.statusCode || 500).json({ message: error.message || "Error interno" });
const getPacientes = async (req, res) => {
  try { res.json({ data: await pacienteService.getPacientes() }); } 
  catch (error) { handleError(res, error); }
};
export const methods = { getPacientes };