const handleError = (res, error) => {
  if (error.statusCode) return res.status(error.statusCode).json({ message: error.message });
  console.error(error);
  return res.status(500).json({ message: "Error interno" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      // Asignar rol basado en el email para el MVP
      let rol = 'paciente';
      if (email.includes('admin')) rol = 'admin';
      else if (email.includes('carlos') || email.includes('ana') || email.includes('medico')) rol = 'medico';
      
      // Crear un mock JWT codificando en Base64 para no guardar el rol en texto plano en el frontend
      const payload = Buffer.from(JSON.stringify({ email, rol })).toString('base64');
      const mockJwt = `header.${payload}.signature`;

      return res.json({ message: "Login exitoso", token: mockJwt });
    }
    throw { statusCode: 401, message: "Credenciales inválidas" };
  } catch (error) {
    return handleError(res, error);
  }
};

const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw { statusCode: 401, message: "No autorizado" };
    }
    
    const token = authHeader.split(' ')[1];
    const payloadBase64 = token.split('.')[1];
    
    if (!payloadBase64) throw { statusCode: 401, message: "Token inválido" };

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
    
    return res.json({ rol: payload.rol, email: payload.email });
  } catch (error) {
    return handleError(res, error);
  }
};

export const methods = { login, me };