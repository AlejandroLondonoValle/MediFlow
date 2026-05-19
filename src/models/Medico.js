import Usuario from "./Usuario.js";

class Medico extends Usuario {
  constructor(id, nombre, email, password, especialidad, consultorio, horarioDisponible) {
    // Rol por defecto: 'medico'
    super(id, nombre, email, password, 'medico');
    this.especialidad = especialidad;
    this.consultorio = consultorio;
    this.horarioDisponible = horarioDisponible || { inicio: "08:00", fin: "17:00" };
  }
}

export default Medico;
