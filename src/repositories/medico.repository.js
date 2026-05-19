import { getConnection } from "../database/database.js";
const getAll = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT m.*, u.nombre, u.email FROM medicos m JOIN usuarios u ON m.usuario_id = u.id");
    return rows;
  } finally { connection.release(); }
};
export const medicoRepository = { getAll };