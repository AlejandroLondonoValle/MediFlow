import { historialService } from "../services/historial.service.js";
const handleError = (res, error) => res.status(error.statusCode || 500).json({ message: error.message || "Error interno" });
const getHistoriales = async (req, res) => {
  try { res.json({ data: await historialService.getHistoriales() }); } 
  catch (error) { handleError(res, error); }
};
export const methods = { getHistoriales };