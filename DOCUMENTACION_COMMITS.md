# Documentación de Commits - Proyecto MediFlow

Este documento detalla el historial de commits ejecutados para la inicialización y construcción del MVP del sistema de gestión clínica MediFlow. Los commits están estructurados semánticamente siguiendo convenciones para facilitar su integración con Jira o sistemas de seguimiento de historias de usuario.

---

## Detalle de Commits

──────────────────────────────────────────
**ID TAREA:**     SCRUM-1
**TIPO:**         feat
**SCOPE:**        config
**DESCRIPCIÓN:**  inicialización y configuración del proyecto
**ARCHIVOS:**     .gitignore, package.json, package-lock.json, .babelrc, .env, database.sql, generate_backend.js, src/app.js, src/server.js, src/database/database.js, diagramas_uml*
**DETALLE:**      Se configuró la base del proyecto Node.js con Express y MySQL. Se agregaron los scripts de base de datos con los seeders para inicializar el MVP y se conectó la aplicación principal al puerto configurado. Se establece la estructura N-Tier.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(config): SCRUM-1 - inicializacion y configuracion del proyecto

- Configuracion de Node.js, Express y base de datos MySQL
- Creacion de scripts SQL para seeders y tablas
- Incluye package.json, servidor y app principal
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-2
**TIPO:**         feat
**SCOPE:**        auth
**DESCRIPCIÓN:**  módulo de autenticación mock y seguridad
**ARCHIVOS:**     src/models/Usuario.js, src/controllers/auth.controller.js, src/routes/auth.routes.js
**DETALLE:**      Se implementó el sistema de login basado en roles mediante la generación de un Mock JWT codificado en Base64. Esto permite aislar la lógica de seguridad sin comprometer el rol del usuario exponiéndolo directamente en el LocalStorage del frontend.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(auth): SCRUM-2 - modulo de autenticacion mock y seguridad

- Implementacion de login mock con roles
- Endpoints protegidos para validacion de JWT mock
- Modelo base de Usuario
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-3
**TIPO:**         feat
**SCOPE:**        medicos
**DESCRIPCIÓN:**  módulo de médicos y especialistas
**ARCHIVOS:**     src/models/Medico.js, src/controllers/medico.controller.js, src/routes/medico.routes.js, src/services/medico.service.js, src/repositories/medico.repository.js
**DETALLE:**      Desarrollo completo de la capa Repository, Service, Controller y Rutas para el manejo de la entidad Médico. Permite listar y gestionar los horarios disponibles, consultorios y especialidades.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(medicos): SCRUM-3 - modulo de medicos y especialistas

- CRUD completo para gestion de medicos
- Implementacion de patron Repository y Service
- Rutas y controladores
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-4
**TIPO:**         feat
**SCOPE:**        pacientes
**DESCRIPCIÓN:**  módulo de pacientes y registros
**ARCHIVOS:**     src/models/Paciente.js, src/controllers/paciente.controller.js, src/routes/paciente.routes.js, src/services/paciente.service.js, src/repositories/paciente.repository.js
**DETALLE:**      Creación del flujo N-Tier para el control de los Pacientes. Vinculación directa con la tabla usuarios mediante Foreign Keys en cascada para la gestión de su información demográfica.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(pacientes): SCRUM-4 - modulo de pacientes y registros

- Gestion de pacientes y datos personales
- Capas de servicio y persistencia integradas
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-5
**TIPO:**         feat
**SCOPE:**        citas
**DESCRIPCIÓN:**  módulo principal de agendamiento de citas
**ARCHIVOS:**     src/models/Cita.js, src/controllers/cita.controller.js, src/routes/cita.routes.js, src/services/cita.service.js, src/repositories/cita.repository.js
**DETALLE:**      Se implementó el núcleo del negocio. Se creó la lógica algorítmica para verificar solapamientos de tiempo y asegurar que un médico no pueda tener dos citas simultáneas.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(citas): SCRUM-5 - modulo principal de agendamiento de citas

- Logica de negocio para validacion de cruce de horarios
- Estados de citas (pendiente, confirmada, cancelada)
- Endpoints de gestion de agenda
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-6
**TIPO:**         feat
**SCOPE:**        historial
**DESCRIPCIÓN:**  módulo de historial clínico
**ARCHIVOS:**     src/models/HistorialClinico.js, src/controllers/historial.controller.js, src/routes/historial.routes.js, src/services/historial.service.js, src/repositories/historial.repository.js
**DETALLE:**      Creación de la API para soportar el almacenamiento de diagnósticos y tratamientos. Conecta relacionalmente la Cita con el Médico y el Paciente dentro de una misma transacción clínica.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(historial): SCRUM-6 - modulo de historial clinico

- Registro de diagnosticos y tratamientos por paciente
- Vinculacion con medicos y citas
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-7
**TIPO:**         feat
**SCOPE:**        frontend
**DESCRIPCIÓN:**  interfaz de login y estilos base
**ARCHIVOS:**     frontend/index.html, frontend/js/app.js, frontend/css/styles.css
**DETALLE:**      Creación de la primera página estática. Se usó Tailwind CSS vía CDN para implementar Glassmorphism, animaciones personalizadas CSS y alertas interactivas con SweetAlert2.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(frontend): SCRUM-7 - interfaz de login y estilos base

- Diseno de login con Tailwind CSS y glassmorphism
- Integracion de SweetAlert2 y animaciones personalizadas
- Consumo de API de autenticacion
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-8
**TIPO:**         feat
**SCOPE:**        frontend
**DESCRIPCIÓN:**  dashboard interactivo con métricas y calendario
**ARCHIVOS:**     frontend/dashboard.html, frontend/js/dashboard.js
**DETALLE:**      Desarrollo de una Single Page Application (SPA) para el Dashboard. Incluye un menú lateral dinámico protegido por roles, un calendario interactivo con cruce de disponibilidad en tiempo real, Grid View para historiales, y la integración de Chart.js para dashboards analíticos según rol.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
feat(frontend): SCRUM-8 - dashboard interactivo con metricas y calendario

- Panel principal adaptativo segun roles (Admin, Medico, Paciente)
- Calendario interactivo con validacion de horarios
- Integracion de Chart.js para metricas y reportes
- Grid de tarjetas para historiales medicos
```
──────────────────────────────────────────

──────────────────────────────────────────
**ID TAREA:**     SCRUM-9
**TIPO:**         fix
**SCOPE:**        core
**DESCRIPCIÓN:**  limpieza de archivos legacy y ajustes finales
**ARCHIVOS:**     *archivos remanentes del sistema anterior* y archivos de logs no deseados.
**DETALLE:**      Commit final en el que se barren controladores y rutas que pertenecían al proyecto de gestor de tareas original (categorías y tareas), adaptando el backend al 100% para MediFlow.
──────────────────────────────────────────
**MENSAJE DE COMMIT:**
```text
fix(core): SCRUM-9 - limpieza de archivos legacy y ajustes finales

- Eliminacion de codigo de proyectos anteriores
- Ajustes de rutas no mapeadas
- Commit final de estabilizacion
```
──────────────────────────────────────────

---

## Tabla Resumen de Tareas (Para Importar a Jira)

| ID | Tipo | Scope | Descripción | Archivos clave |
| :--- | :--- | :--- | :--- | :--- |
| **SCRUM-1** | feat | config | Inicialización y configuración del proyecto | `package.json`, `app.js`, `database.sql` |
| **SCRUM-2** | feat | auth | Módulo de autenticación mock y seguridad | `auth.controller.js`, `Usuario.js` |
| **SCRUM-3** | feat | medicos | Módulo de médicos y especialistas | `medico.controller.js`, `medico.service.js` |
| **SCRUM-4** | feat | pacientes | Módulo de pacientes y registros | `paciente.controller.js`, `paciente.service.js` |
| **SCRUM-5** | feat | citas | Agendamiento de citas y disponibilidad | `cita.controller.js`, `cita.service.js` |
| **SCRUM-6** | feat | historial | Módulo de historial clínico | `historial.controller.js`, `historial.service.js` |
| **SCRUM-7** | feat | frontend | Interfaz de login y estilos base | `index.html`, `app.js`, `styles.css` |
| **SCRUM-8** | feat | frontend | Dashboard interactivo, métricas y calendario | `dashboard.html`, `dashboard.js` |
| **SCRUM-9** | fix | core | Limpieza de archivos legacy y ajustes finales | *Varios (archivos legacy)* |
