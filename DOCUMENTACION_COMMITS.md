# Documentación de Commits — Proyecto **MediFlow**

> Este documento detalla el historial de commits ejecutados para la inicialización y construcción del MVP del sistema de gestión clínica **MediFlow**.
> Los commits están estructurados semánticamente siguiendo convenciones para facilitar su integración con Jira o sistemas de seguimiento de historias de usuario.

---

# Detalle de Commits

---

## SCRUM-1 — Inicialización y configuración del proyecto

| Campo           | Valor                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-1`                                                                                                                                                                                 |
| **TIPO**        | `feat`                                                                                                                                                                                    |
| **SCOPE**       | `config`                                                                                                                                                                                  |
| **DESCRIPCIÓN** | inicialización y configuración del proyecto                                                                                                                                               |
| **ARCHIVOS**    | `.gitignore`, `package.json`, `package-lock.json`, `.babelrc`, `.env`, `database.sql`, `generate_backend.js`, `src/app.js`, `src/server.js`, `src/database/database.js`, `diagramas_uml*` |

### Detalle

Se configuró la base del proyecto Node.js con Express y MySQL. Se agregaron los scripts de base de datos con los seeders para inicializar el MVP y se conectó la aplicación principal al puerto configurado. Se establece la estructura N-Tier.

###  Mensaje de Commit

```text
feat(config): SCRUM-1 - inicializacion y configuracion del proyecto

- Configuracion de Node.js, Express y base de datos MySQL
- Creacion de scripts SQL para seeders y tablas
- Incluye package.json, servidor y app principal
```

---

##  SCRUM-2 — Módulo de autenticación mock y seguridad

| Campo           | Valor                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------ |
| **ID TAREA**    | `SCRUM-2`                                                                                  |
| **TIPO**        | `feat`                                                                                     |
| **SCOPE**       | `auth`                                                                                     |
| **DESCRIPCIÓN** | módulo de autenticación mock y seguridad                                                   |
| **ARCHIVOS**    | `src/models/Usuario.js`, `src/controllers/auth.controller.js`, `src/routes/auth.routes.js` |

###  Detalle

Se implementó el sistema de login basado en roles mediante la generación de un Mock JWT codificado en Base64. Esto permite aislar la lógica de seguridad sin comprometer el rol del usuario exponiéndolo directamente en el LocalStorage del frontend.

###  Mensaje de Commit

```text
feat(auth): SCRUM-2 - modulo de autenticacion mock y seguridad

- Implementacion de login mock con roles
- Endpoints protegidos para validacion de JWT mock
- Modelo base de Usuario
```

---

##  SCRUM-3 — Módulo de médicos y especialistas

| Campo           | Valor                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ID TAREA**    | `SCRUM-3`                                                                                                                                                                |
| **TIPO**        | `feat`                                                                                                                                                                   |
| **SCOPE**       | `medicos`                                                                                                                                                                |
| **DESCRIPCIÓN** | módulo de médicos y especialistas                                                                                                                                        |
| **ARCHIVOS**    | `src/models/Medico.js`, `src/controllers/medico.controller.js`, `src/routes/medico.routes.js`, `src/services/medico.service.js`, `src/repositories/medico.repository.js` |

###  Detalle

Desarrollo completo de la capa Repository, Service, Controller y Rutas para el manejo de la entidad Médico. Permite listar y gestionar los horarios disponibles, consultorios y especialidades.

###  Mensaje de Commit

```text
feat(medicos): SCRUM-3 - modulo de medicos y especialistas

- CRUD completo para gestion de medicos
- Implementacion de patron Repository y Service
- Rutas y controladores
```

---

##  SCRUM-4 — Módulo de pacientes y registros

| Campo           | Valor                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-4`                                                                                                                                                                          |
| **TIPO**        | `feat`                                                                                                                                                                             |
| **SCOPE**       | `pacientes`                                                                                                                                                                        |
| **DESCRIPCIÓN** | módulo de pacientes y registros                                                                                                                                                    |
| **ARCHIVOS**    | `src/models/Paciente.js`, `src/controllers/paciente.controller.js`, `src/routes/paciente.routes.js`, `src/services/paciente.service.js`, `src/repositories/paciente.repository.js` |

###  Detalle

Creación del flujo N-Tier para el control de los Pacientes. Vinculación directa con la tabla usuarios mediante Foreign Keys en cascada para la gestión de su información demográfica.

###  Mensaje de Commit

```text
feat(pacientes): SCRUM-4 - modulo de pacientes y registros

- Gestion de pacientes y datos personales
- Capas de servicio y persistencia integradas
```

---

##  SCRUM-5 — Módulo principal de agendamiento de citas

| Campo           | Valor                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-5`                                                                                                                                                      |
| **TIPO**        | `feat`                                                                                                                                                         |
| **SCOPE**       | `citas`                                                                                                                                                        |
| **DESCRIPCIÓN** | módulo principal de agendamiento de citas                                                                                                                      |
| **ARCHIVOS**    | `src/models/Cita.js`, `src/controllers/cita.controller.js`, `src/routes/cita.routes.js`, `src/services/cita.service.js`, `src/repositories/cita.repository.js` |

###  Detalle

Se implementó el núcleo del negocio. Se creó la lógica algorítmica para verificar solapamientos de tiempo y asegurar que un médico no pueda tener dos citas simultáneas.

###  Mensaje de Commit

```text
feat(citas): SCRUM-5 - modulo principal de agendamiento de citas

- Logica de negocio para validacion de cruce de horarios
- Estados de citas (pendiente, confirmada, cancelada)
- Endpoints de gestion de agenda
```

---

##  SCRUM-6 — Módulo de historial clínico

| Campo           | Valor                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-6`                                                                                                                                                                                      |
| **TIPO**        | `feat`                                                                                                                                                                                         |
| **SCOPE**       | `historial`                                                                                                                                                                                    |
| **DESCRIPCIÓN** | módulo de historial clínico                                                                                                                                                                    |
| **ARCHIVOS**    | `src/models/HistorialClinico.js`, `src/controllers/historial.controller.js`, `src/routes/historial.routes.js`, `src/services/historial.service.js`, `src/repositories/historial.repository.js` |

###  Detalle

Creación de la API para soportar el almacenamiento de diagnósticos y tratamientos. Conecta relacionalmente la Cita con el Médico y el Paciente dentro de una misma transacción clínica.

###  Mensaje de Commit

```text
feat(historial): SCRUM-6 - modulo de historial clinico

- Registro de diagnosticos y tratamientos por paciente
- Vinculacion con medicos y citas
```

---

##  SCRUM-7 — Interfaz de login y estilos base

| Campo           | Valor                                                                  |
| --------------- | ---------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-7`                                                              |
| **TIPO**        | `feat`                                                                 |
| **SCOPE**       | `frontend`                                                             |
| **DESCRIPCIÓN** | interfaz de login y estilos base                                       |
| **ARCHIVOS**    | `frontend/index.html`, `frontend/js/app.js`, `frontend/css/styles.css` |

###  Detalle

Creación de la primera página estática. Se usó Tailwind CSS vía CDN para implementar Glassmorphism, animaciones personalizadas CSS y alertas interactivas con SweetAlert2.

###  Mensaje de Commit

```text
feat(frontend): SCRUM-7 - interfaz de login y estilos base

- Diseno de login con Tailwind CSS y glassmorphism
- Integracion de SweetAlert2 y animaciones personalizadas
- Consumo de API de autenticacion
```

---

##  SCRUM-8 — Dashboard interactivo con métricas y calendario

| Campo           | Valor                                                 |
| --------------- | ----------------------------------------------------- |
| **ID TAREA**    | `SCRUM-8`                                             |
| **TIPO**        | `feat`                                                |
| **SCOPE**       | `frontend`                                            |
| **DESCRIPCIÓN** | dashboard interactivo con métricas y calendario       |
| **ARCHIVOS**    | `frontend/dashboard.html`, `frontend/js/dashboard.js` |

###  Detalle

Desarrollo de una Single Page Application (SPA) para el Dashboard. Incluye un menú lateral dinámico protegido por roles, un calendario interactivo con cruce de disponibilidad en tiempo real, Grid View para historiales, y la integración de Chart.js para dashboards analíticos según rol.

###  Mensaje de Commit

```text
feat(frontend): SCRUM-8 - dashboard interactivo con metricas y calendario

- Panel principal adaptativo segun roles (Admin, Medico, Paciente)
- Calendario interactivo con validacion de horarios
- Integracion de Chart.js para metricas y reportes
- Grid de tarjetas para historiales medicos
```

---

##  SCRUM-9 — Limpieza de archivos legacy y ajustes finales

| Campo           | Valor                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-9`                                                                   |
| **TIPO**        | `fix`                                                                       |
| **SCOPE**       | `core`                                                                      |
| **DESCRIPCIÓN** | limpieza de archivos legacy y ajustes finales                               |
| **ARCHIVOS**    | `*archivos remanentes del sistema anterior*` y archivos de logs no deseados |

###  Detalle

Commit final en el que se barren controladores y rutas que pertenecían al proyecto de gestor de tareas original (categorías y tareas), adaptando el backend al 100% para MediFlow.

###  Mensaje de Commit

```text
fix(core): SCRUM-9 - limpieza de archivos legacy y ajustes finales

- Eliminacion de codigo de proyectos anteriores
- Ajustes de rutas no mapeadas
- Commit final de estabilizacion
```

---

##  SCRUM-10 — Agregar diagramas UML e infraestructura al proyecto

| Campo           | Valor                                                          |
| --------------- | -------------------------------------------------------------- |
| **ID TAREA**    | `SCRUM-10`                                                     |
| **TIPO**        | `feat`                                                         |
| **SCOPE**       | `docs`                                                         |
| **DESCRIPCIÓN** | agregar diagramas UML e infraestructura al proyecto            |
| **ARCHIVOS**    | `README.md`, `diagramas_uml (2).md`, `infrastructure_guide.md` |

###  Detalle

Se actualizó el README.md principal del proyecto para reflejar la versión actual (MediFlow), incluyendo enlaces directos a la documentación existente sobre diagramas UML y la guía de infraestructura.

###  Mensaje de Commit

```text
feat(docs): SCRUM-10 - agregar diagramas UML e infraestructura al proyecto

- Archivo diagramas_uml (2).md con diagramas del sistema
- Archivo infrastructure_guide.md con guia de infraestructura
- Referencias integradas en el README.md actualizadas al proyecto actual
```

---

##  SCRUM-11 — Eliminar script auxiliar de commits

| Campo           | Valor                               |
| --------------- | ----------------------------------- |
| **ID TAREA**    | `SCRUM-11`                          |
| **TIPO**        | `delete`                            |
| **SCOPE**       | `core`                              |
| **DESCRIPCIÓN** | eliminar script auxiliar de commits |
| **ARCHIVOS**    | `do_commits.ps1`                    |

###  Detalle

Se eliminó el script auxiliar en PowerShell usado para la configuración inicial y el empaquetado de commits, garantizando que el código de producción y el repositorio queden libres de artefactos transitorios.

###  Mensaje de Commit

```text
delete(core): SCRUM-11 - eliminar script auxiliar de commits

- Se elimina el archivo de inicializacion do_commits.ps1 del proyecto ya que su ciclo de vida termino
```

---

##  SCRUM-12 — Actualizar registro de commits con tareas finales

| Campo           | Valor                                             |
| --------------- | ------------------------------------------------- |
| **ID TAREA**    | `SCRUM-12`                                        |
| **TIPO**        | `feat`                                            |
| **SCOPE**       | `docs`                                            |
| **DESCRIPCIÓN** | actualizar registro de commits con tareas finales |
| **ARCHIVOS**    | `DOCUMENTACION_COMMITS.md`                        |

###  Detalle

Se sincroniza el historial documental para incluir la creación del README y la eliminación del script de configuración, consolidando el historial del proyecto.

###  Mensaje de Commit

```text
feat(docs): SCRUM-12 - actualizar registro de commits con tareas finales

- Se agregan las entradas para SCRUM-10, SCRUM-11 y SCRUM-12 en el archivo markdown de documentacion
```

---

#  Tabla Resumen de Tareas (Para Importar a Jira)

| ID           | Tipo   | Scope     | Descripción                                         | Archivos Modificados                              |
| :----------- | :----- | :-------- | :-------------------------------------------------- | :------------------------------------------------ |
| **SCRUM-1**  | feat   | config    | Inicialización y configuración del proyecto         | `package.json`, `app.js`, `database.sql`          |
| **SCRUM-2**  | feat   | auth      | Módulo de autenticación mock y seguridad            | `auth.controller.js`, `Usuario.js`                |
| **SCRUM-3**  | feat   | medicos   | Módulo de médicos y especialistas                   | `medico.controller.js`, `medico.service.js`       |
| **SCRUM-4**  | feat   | pacientes | Módulo de pacientes y registros                     | `paciente.controller.js`, `paciente.service.js`   |
| **SCRUM-5**  | feat   | citas     | Agendamiento de citas y disponibilidad              | `cita.controller.js`, `cita.service.js`           |
| **SCRUM-6**  | feat   | historial | Módulo de historial clínico                         | `historial.controller.js`, `historial.service.js` |
| **SCRUM-7**  | feat   | frontend  | Interfaz de login y estilos base                    | `index.html`, `app.js`, `styles.css`              |
| **SCRUM-8**  | feat   | frontend  | Dashboard interactivo, métricas y calendario        | `dashboard.html`, `dashboard.js`                  |
| **SCRUM-9**  | fix    | core      | Limpieza de archivos legacy y ajustes finales       | *Varios (archivos legacy)*                        |
| **SCRUM-10** | feat   | docs      | Agregar diagramas UML e infraestructura al proyecto | `README.md`                                       |
| **SCRUM-11** | delete | core      | Eliminar script auxiliar de commits                 | `do_commits.ps1`                                  |
| **SCRUM-12** | feat   | docs      | Actualizar registro de commits con tareas finales   | `DOCUMENTACION_COMMITS.md`                        |
