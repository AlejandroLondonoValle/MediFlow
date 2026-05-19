# Guía de Infraestructura y Arquitectura Backend

Este documento detalla la infraestructura, arquitectura y patrones de diseño utilizados en el proyecto actual. El objetivo es servir como una guía de referencia (boilerplate) para construir **nuevos proyectos distintos** que respeten exactamente el mismo diseño, escalabilidad y ordenamiento.

## 1. Stack Tecnológico Base

El proyecto es una **API REST** construida sobre Node.js y se apoya en las siguientes tecnologías:
- **Framework Web:** Express.js
- **Base de Datos:** MySQL (conector `mysql2/promise` para soportar `async/await` y Connection Pools).
- **Módulo JS:** ECMAScript Modules (ESM) utilizando Babel (`@babel/node`, `@babel/core`, `@babel/preset-env`) para transpilación de código moderno de JS (`import`/`export`).
- **Variables de Entorno:** `dotenv` a través de un archivo centralizado `config.js`.
- **Documentación API:** Swagger (`swagger-jsdoc`, `swagger-ui-express`).
- **Middlewares:** `cors` (para control de orígenes permitidos) y `morgan` (para logging de peticiones en consola).

---

## 2. Estructura de Directorios

La aplicación sigue una **Arquitectura en Capas (N-Tier Architecture)** para separar responsabilidades. Esto hace que el código sea testeable, mantenible y escalable.

```text
/
├── .env                  # Variables de entorno locales
├── package.json          # Dependencias y scripts
├── .babelrc              # Configuración de Babel
├── src/                  # Código fuente de la aplicación
│   ├── app.js            # Configuración principal de Express, Middlewares y Swagger
│   ├── server.js         # Entry point: Levanta el servidor en el puerto
│   ├── config.js         # Carga y exportación centralizada de variables de entorno (.env)
│   ├── database/         # Configuración y conexión a bases de datos
│   │   └── database.js   # Pool de conexiones MySQL
│   ├── routes/           # Definición de endpoints y documentación Swagger
│   ├── controllers/      # Controladores HTTP (Manejo de request/response)
│   ├── services/         # Lógica de Negocio
│   └── repositories/     # Acceso a Datos (Consultas SQL)
```

---

## 3. Patrón de las Capas (Flujo de Datos)

Para añadir una nueva entidad a un futuro proyecto, deberás crear un archivo en cada una de las 4 capas principales. El flujo siempre debe ser unidireccional:
**Request** ➔ `Route` ➔ `Controller` ➔ `Service` ➔ `Repository` ➔ **Base de Datos**

A continuación, se define la responsabilidad y la estructura estándar de cada capa:

### Capa 1: Routes (`src/routes/*.routes.js`)
**Responsabilidad:** Definir los endpoints de la API, el método HTTP (GET, POST, etc.) y la documentación con Swagger mediante comentarios JSDoc. Sólo se encarga de recibir la ruta y redirigir al controlador.

```javascript
import { Router } from "express";
import { methods as entityController } from "../controllers/entity.controller.js";

const router = Router();

/**
 * @swagger
 * /api/entity:
 *   get:
 *     summary: Obtener entidades
 *     ...
 */
router.get("/", entityController.getAll);

export default router;
```

### Capa 2: Controllers (`src/controllers/*.controller.js`)
**Responsabilidad:** Extraer información del objeto `req` (params, body, query), invocar a la capa de `Service` y retornar una respuesta HTTP (`res.json`, `res.status`). **No debe contener lógica de negocio ni consultas SQL.** Suele incluir un manejador de errores estandarizado.

```javascript
import { entityService } from "../services/entity.service.js";

const handleError = (res, error) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: "Error interno del servidor" });
};

const getAll = async (req, res) => {
  try {
    const data = await entityService.getAll();
    return res.json({ data });
  } catch (error) {
    return handleError(res, error);
  }
};

export const methods = {
  getAll
};
```

### Capa 3: Services (`src/services/*.service.js`)
**Responsabilidad:** Es el núcleo de la aplicación. Aquí va toda la **lógica de negocio**. Realiza validaciones, transformaciones de datos y orquesta llamadas a uno o varios repositorios si es necesario.

```javascript
import { entityRepository } from "../repositories/entity.repository.js";

const getAll = async () => {
  // Lógica de negocio (si aplica)
  return entityRepository.getAll();
};

export const entityService = {
  getAll
};
```

### Capa 4: Repositories (`src/repositories/*.repository.js`)
**Responsabilidad:** Interactuar de forma directa con la base de datos (Ejecutar queries de SQL). Esta capa abstrae la base de datos del resto de la aplicación. Obtiene su conexión de `src/database/database.js` y siempre la libera con `connection.release()`.

```javascript
import { getConnection } from "../database/database.js";

const getAll = async () => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(`SELECT * FROM entity`);
    return rows;
  } finally {
    connection.release(); // Muy importante liberar la conexión del pool
  }
};

export const entityRepository = {
  getAll
};
```

---

## 4. Archivos Core y de Configuración

Para mantener la base sólida en nuevos proyectos, asegúrate de replicar estos componentes:

- **`src/config.js`:** En lugar de llamar a `process.env` en todo el proyecto, centralízalo aquí. Esto facilita dar valores por defecto (ej. `port: process.env.PORT || 4000`).
- **`src/database/database.js`:** Utiliza `mysql.createPool` en lugar de una conexión sencilla. Los "Connection Pools" manejan múltiples conexiones en paralelo, lo que previene que la aplicación se caiga bajo demanda.
- **`src/app.js`:** 
  - Configura los orígenes permitidos en el array `allowedOrigins` para los bloqueos de CORS.
  - Expón Swagger (SwaggerUI) apuntando a las anotaciones dentro de la carpeta `/routes`.
  - Configura el parser `express.json()` para leer el body de las peticiones.
- **Transpilación (Babel):** 
  - El script de desarrollo (`npm run dev`) debe ser configurado como `"nodemon --exec babel-node src/server.js"`.
  - El de construcción (`npm run build`) debe compilar de `src/` a `dist/` usando `"babel src -d dist"`.
