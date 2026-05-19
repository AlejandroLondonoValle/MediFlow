import { medicoService } from "../services/medico.service.js";
const handleError = (res, error) => res.status(error.statusCode || 500).json({ message: error.message || "Error interno" });
const getMedicos = async (req, res) => {
  try { res.json({ data: await medicoService.getMedicos() }); } 
  catch (error) { handleError(res, error); }
};
export const methods = { getMedicos };