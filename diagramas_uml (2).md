# Diagramas UML - Proyecto Clínica (MediFlow)

A continuación, se presentan los diagramas UML solicitados, basados estrictamente en el código y la arquitectura actual del proyecto (MVC Vanilla JavaScript + LocalStorage).

## 1. Diagrama de Clases
Muestra la estructura de los modelos principales y sus herencias.

```mermaid
classDiagram
    class Usuario {
        +String id
        +String nombre
        +String email
        +String password
        +String rol
    }
    class Paciente {
        +String id
        +String apellido
        +String documento
        +String telefono
        +String fechaNacimiento
        +get nombreCompleto()
    }
    class Medico {
        +String id
        +String especialidad
        +String consultorio
        +Object horarioDisponible
    }
    class Cita {
        +String id
        +String idMedico
        +String idPaciente
        +String fecha
        +String horaInicio
        +String horaFin
        +String estado
    }
    class HistorialClinico {
        +String id
        +String idPaciente
        +String idMedico
        +String idCita
        +String fecha
        +String diagnostico
        +String tratamiento
        +String notas
    }
    
    Usuario <|-- Paciente
    Usuario <|-- Medico
    Cita "1" --> "1" Paciente : Pertenece a
    Cita "1" --> "1" Medico : Asignada a
    HistorialClinico "1" --> "1" Paciente : Describe a
    HistorialClinico "1" --> "1" Medico : Registrado por
```

---

## 2. Diagrama de Objetos
Ejemplifica instancias reales del sistema interactuando en un momento determinado.

```mermaid
classDiagram
    class JuanPerez {
        id: "P001"
        nombre: "Juan"
        apellido: "Pérez"
        documento: "123456789"
        telefono: "3001234567"
        email: "juan@mail.com"
        rol: "paciente"
    }
    class DrCarlosMartinez {
        id: "M001"
        nombre: "Carlos Martínez"
        especialidad: "Cardiología"
        consultorio: "101A"
        email: "carlos@mediflow.com"
        rol: "medico"
        horarioDisponible: { inicio: "08:00", fin: "17:00" }
    }
    class CitaCardiologia {
        id: "C001"
        idMedico: "M001"
        idPaciente: "P001"
        fecha: "2026-06-15"
        horaInicio: "10:00"
        horaFin: "10:20"
        estado: "confirmada"
    }
    
    CitaCardiologia --> JuanPerez : Referencia a paciente
    CitaCardiologia --> DrCarlosMartinez : Referencia a médico
```

---

## 3. Diagrama de Paquetes
Muestra la arquitectura en capas (Vistas, Controladores, Servicios y Modelos).

```mermaid
flowchart TB
    subgraph Frontend [Capa de Presentación / Vistas]
        HTML[index.html]
        CSS[css/styles.css]
    end
    
    subgraph Controllers [Capa de Controladores]
        App[AppController]
        AuthC[AuthController]
        CitaC[CitaController]
        HistC[HistorialController]
        MedC[MedicoController]
        PacC[PacienteController]
        DashC[DashboardController]
    end
    
    subgraph Services [Capa de Servicios]
        AuthS[AuthService]
        StorageS[StorageService]
    end
    
    subgraph Models [Capa de Modelos]
        ModelsIndex[index.js]
        UsuarioM[Usuario]
        PacienteM[Paciente]
        MedicoM[Medico]
        CitaM[Cita]
        HistorialM[HistorialClinico]
    end
    
    Frontend --> Controllers
    Controllers --> Services
    Controllers --> Models
    Services --> Models
    StorageS -.-> LocalStorage[(LocalStorage API)]
```

---

## 4. Diagrama de Actividades
Representa el flujo de trabajo al **Agendar una Cita**.

```mermaid
stateDiagram-v2
    [*] --> IniciarSesion
    IniciarSesion --> AbrirModuloCitas : Autenticación exitosa
    AbrirModuloCitas --> ElegirMedicoYHora: Clic en "Agendar Cita" y llenar formulario
    
    state ValidacionDeReglas {
        [*] --> CheckDisponibilidad
        CheckDisponibilidad --> CheckHorarioMedico : Revisa si la hora seleccionada está dentro del turno
        CheckHorarioMedico --> CheckCrucesDeCitas : Revisa que el médico no tenga otra cita a esa hora
    }
    
    ElegirMedicoYHora --> ValidacionDeReglas : Enviar Formulario
    
    ValidacionDeReglas --> MostrarError: Hay conflicto de horario o no labora
    MostrarError --> ElegirMedicoYHora
    
    ValidacionDeReglas --> GuardarCita: Datos válidos
    GuardarCita --> MostrarExitoModal
    MostrarExitoModal --> [*]
```

---

## 5. Diagrama de Estados
Muestra el ciclo de vida de una **Cita Médica**.

```mermaid
stateDiagram-v2
    [*] --> Pendiente : Se crea la cita en el sistema
    
    Pendiente --> Confirmada : Admin o Médico aprueba
    Pendiente --> Cancelada : Admin o Paciente cancela
    
    Confirmada --> Atendida : Médico registra como atendida
    Confirmada --> Cancelada : Admin o Paciente cancela
    
    Atendida --> [*] : Ciclo cerrado con éxito
    Cancelada --> [*] : Ciclo abortado
```

---

## 6. Diagrama de Casos de Uso
Expone cómo los diferentes actores (roles) interactúan con los módulos del sistema.

```mermaid
flowchart LR
    Admin(["🧑‍💼 Administrador"])
    Medico(["👨‍⚕️ Médico"])
    Paciente(["🧍 Paciente"])
    
    subgraph MediFlow [Sistema MediFlow]
        UC1(Autenticarse en el sistema)
        UC2(Gestionar Médicos CRUD)
        UC3(Gestionar Pacientes CRUD)
        UC4(Agendar Citas)
        UC5(Confirmar / Cancelar Citas)
        UC6(Marcar Cita como Atendida)
        UC7(Filtrar y Ver Historial Clínico)
        UC8(Registrar Nuevo Historial)
    end
    
    Admin --> UC1
    Medico --> UC1
    Paciente --> UC1
    
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Paciente --> UC4
    
    Admin --> UC5
    Medico --> UC5
    Paciente --> UC5
    
    Medico --> UC6
    
    Admin --> UC7
    Medico --> UC7
    Paciente --> UC7
    
    Medico --> UC8
```

---

## 7. Diagrama de Secuencia
Ilustra los pasos y llamados a métodos al momento de **Agendar y Guardar una Cita**.

```mermaid
sequenceDiagram
    actor Paciente
    participant UI as Interfaz (DOM)
    participant CitaC as CitaController
    participant Storage as StorageService
    participant Local as API LocalStorage
    
    Paciente->>UI: Clic en "Agendar Cita"
    UI->>CitaC: renderForm()
    CitaC->>Storage: getCollection('medicos')
    Storage->>Local: getItem('mediflow_medicos')
    Local-->>Storage: String JSON
    Storage-->>CitaC: Objeto[] de Médicos
    CitaC-->>UI: Inyecta el formulario HTML
    Paciente->>UI: Rellena formulario y da clic en Guardar
    UI->>CitaC: 'submit' Event listener
    CitaC->>Storage: Verifica conflictos y horario laboral
    Storage-->>CitaC: Validación OK (Sin conflicto)
    CitaC->>Storage: saveToCollection('citas', nuevaCitaObj)
    Storage->>Local: setItem('mediflow_citas', newData)
    CitaC->>UI: Swal.fire(Éxito) y actualiza el calendario
    UI-->>Paciente: Muestra cita recién agendada
```
