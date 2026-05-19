class Cita {
  constructor(id, idMedico, idPaciente, fecha, horaInicio, horaFin, estado = 'pendiente') {
    this.id = id;
    this.idMedico = idMedico;
    this.idPaciente = idPaciente;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.estado = estado;
  }
}

export default Cita;
