import { medicoRepository } from "../repositories/medico.repository.js";
const getMedicos = async () => { return medicoRepository.getAll(); };
export const medicoService = { getMedicos };