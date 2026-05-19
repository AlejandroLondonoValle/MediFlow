# 🚀 Gestor de Tareas - Backend

Backend REST para el proyecto académico **Gestor de Tareas**.

Está construido con **Node.js**, **Express**, **MySQL**, **Babel** y **Swagger**, siguiendo una arquitectura por capas:

```
Controller → Service → Repository → Database
```

---

## 🧰 Tecnologías

| Tecnología     | Descripción                    |
| -------------- | ------------------------------ |
| Node.js        | Entorno de ejecución           |
| Express        | Framework backend              |
| MySQL          | Base de datos                  |
| dotenv         | Manejo de variables de entorno |
| mysql2/promise | Cliente MySQL con promesas     |
| Swagger        | Documentación de API           |
| morgan         | Logger de peticiones           |
| Babel          | Transpilador                   |

---

## 📁 Estructura del Proyecto

```text
backend/
│── .env.example
│── .babelrc
│── package.json
│── README.md
│── database.sql
│
└── src/
    │── app.js
    │── server.js
    │── config.js
    │
    ├── controllers/
    │   ├── category.controller.js
    │   └── task.controller.js
    │
    ├── services/
    │   ├── category.service.js
    │   └── task.service.js
    │
    ├── repositories/
    │   ├── category.repository.js
    │   └── task.repository.js
    │
    ├── database/
    │   └── database.js
    │
    └── routes/
        ├── category.routes.js
        └── task.routes.js
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
APP_NAME=Gestor de Tareas API
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=gestor_tareas
```

---

## 📦 Instalación

```bash
# 1. Entrar al proyecto
cd backend

# 2. Instalar dependencias
npm install
```

Luego:

1. Ejecuta `database.sql` en MySQL
2. Configura tu archivo `.env`

---

## ▶️ Ejecución

### 🧪 Desarrollo

```bash
npm run dev
```

### 🚀 Producción

```bash
npm run build
npm start
```

---

## 🌐 Endpoints

### 📌 Tasks

| Método | Endpoint       | Descripción      |
| ------ | -------------- | ---------------- |
| GET    | /api/tasks     | Listar tareas    |
| GET    | /api/tasks/:id | Obtener tarea    |
| POST   | /api/tasks     | Crear tarea      |
| PUT    | /api/tasks/:id | Actualizar tarea |
| DELETE | /api/tasks/:id | Eliminar tarea   |

---

### 📂 Categories

| Método | Endpoint        | Descripción       |
| ------ | --------------- | ----------------- |
| GET    | /api/categories | Listar categorías |

---

## 📤 Formato de Respuestas

### 📄 Listado

```json
{
  "data": []
}
```

### 📄 Recurso individual

```json
{
  "data": {}
}
```

### ✅ Crear / Actualizar

```json
{
  "message": "Mensaje claro en español",
  "data": {}
}
```

### 🗑️ Eliminar

```json
{
  "message": "Eliminado correctamente"
}
```

### ❌ Error

```json
{
  "message": "Mensaje claro en español"
}
```

---

## 📚 Documentación Swagger

Con el servidor corriendo:

```
http://localhost:4000/api/docs
```

---

## 📝 Notas Importantes

* ❌ No incluye autenticación (JWT, roles)
* ❌ No utiliza ORM
* ⚡ Usa consultas SQL directas en `repository`
* 🧠 Validaciones en la capa `service`
* 🔗 CORS no incluido (uso de **Vite Proxy** en frontend)

---

## 👨‍💻 Autores
**Juan Esteban Isaza**
**Luis Alejandro Londoño Valle**
**Yeison Alejandro Zapata**
**Fabian Hernandez Valencia**



---
