-- Creación de la base de datos para MediFlow (Clínica)
CREATE DATABASE IF NOT EXISTS mediflow_db;
USE mediflow_db;

-- Tabla Usuarios (Clase padre)
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'medico', 'paciente') NOT NULL DEFAULT 'paciente',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id VARCHAR(50) PRIMARY KEY,
    usuario_id VARCHAR(50) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    fechaNacimiento DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Médicos
CREATE TABLE IF NOT EXISTS medicos (
    id VARCHAR(50) PRIMARY KEY,
    usuario_id VARCHAR(50) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    consultorio VARCHAR(50),
    horarioDisponible JSON, -- Ej: {"inicio": "08:00", "fin": "17:00"}
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Citas
CREATE TABLE IF NOT EXISTS citas (
    id VARCHAR(50) PRIMARY KEY,
    idMedico VARCHAR(50) NOT NULL,
    idPaciente VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'atendida') DEFAULT 'pendiente',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idMedico) REFERENCES medicos(id) ON DELETE CASCADE,
    FOREIGN KEY (idPaciente) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabla Historial Clínico
CREATE TABLE IF NOT EXISTS historiales_clinicos (
    id VARCHAR(50) PRIMARY KEY,
    idPaciente VARCHAR(50) NOT NULL,
    idMedico VARCHAR(50) NOT NULL,
    idCita VARCHAR(50),
    fecha DATE NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    notas TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPaciente) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (idMedico) REFERENCES medicos(id) ON DELETE CASCADE,
    FOREIGN KEY (idCita) REFERENCES citas(id) ON DELETE SET NULL
);

-- ==========================================================
-- SEEDERS (Datos de prueba para el MVP)
-- ==========================================================

-- Insertar Usuarios (1 Admin, 2 Médicos, 2 Pacientes)
-- NOTA: Las contraseñas están en texto plano para el MVP (mock login).
INSERT INTO usuarios (id, nombre, email, password, rol) VALUES
('U_ADMIN1', 'Administrador Principal', 'admin@mediflow.com', '123456', 'admin'),
('U_MED1', 'Dr. Carlos Martínez', 'carlos@mediflow.com', '123456', 'medico'),
('U_MED2', 'Dra. Ana Gómez', 'ana@mediflow.com', '123456', 'medico'),
('U_PAC1', 'Juan', 'juan@mail.com', '123456', 'paciente'),
('U_PAC2', 'María', 'maria@mail.com', '123456', 'paciente')
ON DUPLICATE KEY UPDATE email=email;

-- Insertar Médicos (Referencias a los usuarios de arriba)
INSERT INTO medicos (id, usuario_id, especialidad, consultorio, horarioDisponible) VALUES
('M001', 'U_MED1', 'Cardiología', '101A', '{"inicio": "08:00", "fin": "17:00"}'),
('M002', 'U_MED2', 'Pediatría', '204B', '{"inicio": "09:00", "fin": "14:00"}')
ON DUPLICATE KEY UPDATE consultorio=consultorio;

-- Insertar Pacientes (Referencias a los usuarios de arriba)
INSERT INTO pacientes (id, usuario_id, apellido, documento, telefono, fechaNacimiento) VALUES
('P001', 'U_PAC1', 'Pérez', '123456789', '3001234567', '1985-06-15'),
('P002', 'U_PAC2', 'López', '987654321', '3109876543', '1992-11-20')
ON DUPLICATE KEY UPDATE documento=documento;

-- Insertar Citas de Prueba
INSERT INTO citas (id, idMedico, idPaciente, fecha, horaInicio, horaFin, estado) VALUES
('C001', 'M001', 'P001', '2026-06-15', '10:00:00', '10:30:00', 'confirmada'),
('C002', 'M002', 'P002', '2026-06-16', '09:00:00', '09:45:00', 'pendiente'),
('C003', 'M001', 'P002', '2026-06-17', '14:00:00', '14:30:00', 'cancelada')
ON DUPLICATE KEY UPDATE estado=estado;

-- Insertar Historial Clínico de Prueba
INSERT INTO historiales_clinicos (id, idPaciente, idMedico, idCita, fecha, diagnostico, tratamiento, notas) VALUES
('H001', 'P001', 'M001', 'C001', '2026-06-15', 'Hipertensión leve', 'Dieta baja en sodio y ejercicio 3 veces por semana', 'El paciente reporta dolores de cabeza ocasionales. Se programará revisión en 1 mes.')
ON DUPLICATE KEY UPDATE diagnostico=diagnostico;
