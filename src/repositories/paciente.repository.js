import { getConnection } from "../database/database.js";
const getAll = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT p.*, u.nombre, u.email FROM pacientes p JOIN usuarios u ON p.usuario_id = u.id");
    return rows;
  } finally { connection.release(); }
};
export const pacienteRepository = { getAll };