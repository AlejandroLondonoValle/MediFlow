import { getConnection } from "../database/database.js";
const getAll = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM historiales_clinicos ORDER BY fecha DESC");
    return rows;
  } finally { connection.release(); }
};
export const historialRepository = { getAll };