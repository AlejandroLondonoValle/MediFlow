import { historialRepository } from "../repositories/historial.repository.js";
const getHistoriales = async () => { return historialRepository.getAll(); };
export const historialService = { getHistoriales };