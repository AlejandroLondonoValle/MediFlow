import { getConnection } from "../database/database.js";
import Cita from "../models/Cita.js";

const getAll = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT id, idMedico, idPaciente, fecha, horaInicio, horaFin, estado, createdAt 
       FROM citas ORDER BY fecha DESC, horaInicio DESC`
    );
    return rows;
  } finally {
    connection.release();
  }
};

const getById = async (id) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT * FROM citas WHERE id = ?`, [id]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
};

const getByMedicoId = async (idMedico) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT * FROM citas WHERE idMedico = ? ORDER BY fecha, horaInicio`, [idMedico]
    );
    return rows;
  } finally {
    connection.release();
  }
};

const create = async (cita) => {
  const connection = await getConnection();
  try {
    await connection.query(
      `INSERT INTO citas (id, idMedico, idPaciente, fecha, horaInicio, horaFin, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [cita.id, cita.idMedico, cita.idPaciente, cita.fecha, cita.horaInicio, cita.horaFin, cita.estado]
    );
    return cita;
  } finally {
    connection.release();
  }
};

const updateEstado = async (id, estado) => {
  const connection = await getConnection();
  try {
    await connection.query(
      `UPDATE citas SET estado = ? WHERE id = ?`,
      [estado, id]
    );
    return { id, estado };
  } finally {
    connection.release();
  }
};

export const citaRepository = {
  getAll,
  getById,
  getByMedicoId,
  create,
  updateEstado
};
