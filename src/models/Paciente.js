import Usuario from "./Usuario.js";

class Paciente extends Usuario {
  constructor(id, nombre, email, password, apellido, documento, telefono, fechaNacimiento) {
    // Rol por defecto: 'paciente'
    super(id, nombre, email, password, 'paciente');
    this.apellido = apellido;
    this.documento = documento;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}

export default Paciente;
