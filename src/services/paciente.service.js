import { pacienteRepository } from "../repositories/paciente.repository.js";
const getPacientes = async () => { return pacienteRepository.getAll(); };
export const pacienteService = { getPacientes };