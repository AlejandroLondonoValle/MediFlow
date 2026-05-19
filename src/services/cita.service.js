import { citaRepository } from "../repositories/cita.repository.js";
import Cita from "../models/Cita.js";
import crypto from "crypto";

const getCitas = async () => {
  return citaRepository.getAll();
};

const getCitaById = async (id) => {
  const cita = await citaRepository.getById(id);
  if (!cita) {
    const error = new Error("Cita no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return cita;
};

const getCitasPorMedico = async (idMedico) => {
  return citaRepository.getByMedicoId(idMedico);
};

const agendarCita = async (data) => {
  const { idMedico, idPaciente, fecha, horaInicio, horaFin } = data;
  
  if (!idMedico || !idPaciente || !fecha || !horaInicio || !horaFin) {
    const error = new Error("Faltan datos obligatorios para agendar la cita");
    error.statusCode = 400;
    throw error;
  }

  // Aquí se podrían agregar validaciones de cruce de horarios (Reglas de negocio del Diagrama 4)
  const citasMedico = await citaRepository.getByMedicoId(idMedico);
  const cruce = citasMedico.find(c => c.fecha === fecha && c.estado !== 'cancelada' &&
    ((horaInicio >= c.horaInicio && horaInicio < c.horaFin) || 
     (horaFin > c.horaInicio && horaFin <= c.horaFin))
  );

  if (cruce) {
    const error = new Error("El médico ya tiene una cita agendada en ese horario");
    error.statusCode = 409;
    throw error;
  }

  const id = crypto.randomUUID();
  const nuevaCita = new Cita(id, idMedico, idPaciente, fecha, horaInicio, horaFin, 'pendiente');
  
  return citaRepository.create(nuevaCita);
};

const cambiarEstado = async (id, estado) => {
  const estadosValidos = ['pendiente', 'confirmada', 'cancelada', 'atendida'];
  if (!estadosValidos.includes(estado)) {
    const error = new Error("Estado no válido");
    error.statusCode = 400;
    throw error;
  }

  await getCitaById(id); // Verifica si existe
  return citaRepository.updateEstado(id, estado);
};

export const citaService = {
  getCitas,
  getCitaById,
  getCitasPorMedico,
  agendarCita,
  cambiarEstado
};
