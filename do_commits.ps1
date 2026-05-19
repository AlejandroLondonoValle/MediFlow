git init
git branch -M main
git remote add origin https://github.com/AlejandroLondonoValle/MediFlow.git

git add .gitignore package.json package-lock.json .babelrc database.sql src/app.js src/server.js src/database/database.js diagramas_uml*
git commit -m "feat(config): SCRUM-1 - inicializacion y configuracion del proyecto

- Configuracion de Node.js, Express y base de datos MySQL
- Creacion de scripts SQL para seeders y tablas
- Incluye package.json, servidor y app principal"

git add src/models/Usuario.js src/controllers/auth.controller.js src/routes/auth.routes.js
git commit -m "feat(auth): SCRUM-2 - modulo de autenticacion mock y seguridad

- Implementacion de login mock con roles
- Endpoints protegidos para validacion de JWT mock
- Modelo base de Usuario"

git add src/models/Medico.js src/controllers/medico.controller.js src/routes/medico.routes.js src/services/medico.service.js src/repositories/medico.repository.js
git commit -m "feat(medicos): SCRUM-3 - modulo de medicos y especialistas

- CRUD completo para gestion de medicos
- Implementacion de patron Repository y Service
- Rutas y controladores"

git add src/models/Paciente.js src/controllers/paciente.controller.js src/routes/paciente.routes.js src/services/paciente.service.js src/repositories/paciente.repository.js
git commit -m "feat(pacientes): SCRUM-4 - modulo de pacientes y registros

- Gestion de pacientes y datos personales
- Capas de servicio y persistencia integradas"

git add src/models/Cita.js src/controllers/cita.controller.js src/routes/cita.routes.js src/services/cita.service.js src/repositories/cita.repository.js
git commit -m "feat(citas): SCRUM-5 - modulo principal de agendamiento de citas

- Logica de negocio para validacion de cruce de horarios
- Estados de citas (pendiente, confirmada, cancelada)
- Endpoints de gestion de agenda"

git add src/models/HistorialClinico.js src/controllers/historial.controller.js src/routes/historial.routes.js src/services/historial.service.js src/repositories/historial.repository.js
git commit -m "feat(historial): SCRUM-6 - modulo de historial clinico

- Registro de diagnosticos y tratamientos por paciente
- Vinculacion con medicos y citas"

git add frontend/index.html frontend/js/app.js frontend/css/styles.css
git commit -m "feat(frontend): SCRUM-7 - interfaz de login y estilos base

- Diseno de login con Tailwind CSS y glassmorphism
- Integracion de SweetAlert2 y animaciones personalizadas
- Consumo de API de autenticacion"

git add frontend/dashboard.html frontend/js/dashboard.js
git commit -m "feat(frontend): SCRUM-8 - dashboard interactivo con metricas y calendario

- Panel principal adaptativo segun roles (Admin, Medico, Paciente)
- Calendario interactivo con validacion de horarios
- Integracion de Chart.js para metricas y reportes
- Grid de tarjetas para historiales medicos"

git add .
git commit -m "fix(core): SCRUM-9 - limpieza de archivos legacy y ajustes finales

- Eliminacion de codigo de proyectos anteriores
- Ajustes de rutas no mapeadas
- Commit final de estabilizacion"

git push -u origin main
