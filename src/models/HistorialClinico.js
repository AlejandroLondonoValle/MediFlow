class HistorialClinico {
  constructor(id, idPaciente, idMedico, idCita, fecha, diagnostico, tratamiento, notas) {
    this.id = id;
    this.idPaciente = idPaciente;
    this.idMedico = idMedico;
    this.idCita = idCita;
    this.fecha = fecha;
    this.diagnostico = diagnostico;
    this.tratamiento = tratamiento;
    this.notas = notas;
  }
}

export default HistorialClinico;
