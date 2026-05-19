# MediFlow - Sistema de Gestión Clínica 🏥

MediFlow es un sistema integral (MVP) desarrollado con una arquitectura N-Tier (Node.js, Express, MySQL) en el Backend, y un Frontend robusto con Vanilla JS, Tailwind CSS y Chart.js para gestionar citas médicas, historiales clínicos, médicos y pacientes.

## Características Principales
- **Gestión de Roles**: Accesos diferenciados para Administrador, Médico y Paciente.
- **Agendamiento Inteligente**: Calendario dinámico con cálculo de disponibilidad real en franjas de 30 minutos y bloqueo de solapamientos.
- **Historial Clínico**: Registro estructurado de consultas, diagnósticos y tratamientos.
- **Dashboards Interactivos**: Panel de control SPA con métricas clave, gráficas de distribución y grillas de datos filtrables.

## Diagramas UML
Toda la lógica de negocio, reglas de validación y flujos de interacción del sistema fueron modelados previamente. 
Puedes consultar todos los Casos de Uso, el Modelo de Dominio relacional y los Diagramas de Actividades en el siguiente documento:
👉 **[Ver Diagramas UML](./diagramas_uml%20(2).md)**

## Infraestructura
El proyecto está construido bajo un patrón arquitectónico en capas limpias que separa responsabilidades en: Rutas, Controladores, Servicios y Repositorios. Para entender a detalle el flujo de datos, la configuración del pool de conexiones MySQL y las decisiones técnicas:
👉 **[Ver Guía de Infraestructura](./infrastructure_guide.md)**

## Instalación y Ejecución Local
1. Clona este repositorio: `git clone https://github.com/AlejandroLondonoValle/MediFlow.git`
2. Ve a la carpeta del proyecto e instala las dependencias: `npm install`
3. Configura tus variables de entorno (puedes basarte en `.env.example`).
4. Ejecuta el script `database.sql` en tu gestor MySQL para construir la base de datos `mediflow_db` y poblarla con datos de prueba (Seeders).
5. Inicia la API: `npm run dev` (Correrá en `http://localhost:4000`)
6. Abre el archivo `frontend/index.html` en tu navegador para interactuar con la aplicación.
