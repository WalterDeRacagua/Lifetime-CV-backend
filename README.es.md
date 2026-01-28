# 🚀 Lifetime-CV Backend

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

![License](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Express](https://img.shields.io/badge/express-5.x-lightgrey.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-16.x-blue.svg)
![TypeORM](https://img.shields.io/badge/typeorm-0.3.x-orange.svg)

API Backend construida con Express.js y PostgreSQL para el proyecto Lifetime-CV - Un sistema dinámico de gestión de CV con soporte multilingüe.

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)
- [Testing](#testing)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 📖 Acerca del Proyecto

Lifetime-CV Backend es una API RESTful que alimenta un sistema dinámico de gestión de CV multilingüe. Proporciona endpoints seguros para autenticación, gestión de contenido, formularios de contacto y analíticas.

Este backend soporta la aplicación [Lifetime-CV Frontend](https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-frontend).

## ✨ Características

- 🔐 Sistema de autenticación basado en JWT
- 🌍 Soporte de contenido multilingüe (Español, Inglés, Francés, Alemán)
- 📧 Formulario de contacto con integración de email
- 📊 Seguimiento de analíticas y estadísticas
- 🎨 Gestión dinámica de contenido (experiencias, proyectos, habilidades)
- 🔗 Integración con la API de GitHub
- 📄 Generación de PDF para exportación de CV
- 🛡️ Validación de entrada y middleware de seguridad
- 🧪 Cobertura completa de tests

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js (>= 18.x)
- **Framework:** Express.js 5.x
- **Base de Datos:** PostgreSQL 16.x
- **ORM:** TypeORM 0.3.x
- **Autenticación:** JWT (jsonwebtoken)
- **Validación:** Express-validator
- **Testing:** Jest + Supertest
- **Email:** Nodemailer
- **Documentación API:** Swagger / OpenAPI
- **Calidad de Código:** ESLint + Prettier
- **Contenedores:** Docker + Docker Compose

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v18.x o superior)
- [npm](https://www.npmjs.com/) (v9.x o superior) o [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v16.x o superior)
- [Docker](https://www.docker.com/) (opcional, para base de datos en contenedor)
- [Git](https://git-scm.com/)

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-backend.git
cd Lifetime-CV-backend
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita el archivo `.env` con tu configuración (ver sección [Variables de Entorno](#variables-de-entorno)).

## 🔐 Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```env
# Aplicación
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Base de Datos
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/lifetime_cv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lifetime_cv
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

# JWT
JWT_SECRET=tu_clave_secreta_jwt_cambiar_en_produccion
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=tu_secret_refresh_token
JWT_REFRESH_EXPIRES_IN=30d

# Configuración de Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
EMAIL_FROM=noreply@lifetime-cv.com

# API de GitHub (opcional)
GITHUB_TOKEN=tu_token_personal_de_github
GITHUB_USERNAME=tu_usuario_github

# URL del Frontend (CORS)
FRONTEND_URL=http://localhost:4200

# Limitación de Tasa
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🗄️ Configuración de la Base de Datos

### Opción 1: Usando Docker (Recomendado para desarrollo)

```bash
# Iniciar contenedor de PostgreSQL
docker-compose up -d

# La base de datos estará disponible en localhost:5432
```

### Opción 2: Instalación Local de PostgreSQL

1. Instala PostgreSQL en tu sistema
2. Crea una base de datos:

```bash
psql -U postgres
CREATE DATABASE lifetime_cv;
CREATE USER tu_usuario WITH PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE lifetime_cv TO tu_usuario;
\q
```

3. Ejecuta las migraciones:

```bash
npm run migration:run
# o genera una nueva migración
npm run migration:generate -- -n NombreMigracion
```

4. Poblar la base de datos (opcional):

```bash
npm run seed
```

## ▶️ Ejecutar la Aplicación

### Modo desarrollo con hot-reload

```bash
npm run dev
```

### Modo producción

```bash
npm run build
npm start
```

La API estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo con hot-reload |
| `npm start` | Iniciar servidor de producción |
| `npm run build` | Construir para producción |
| `npm test` | Ejecutar tests |
| `npm run test:watch` | Ejecutar tests en modo observación |
| `npm run test:coverage` | Ejecutar tests con reporte de cobertura |
| `npm run lint` | Ejecutar ESLint |
| `npm run lint:fix` | Corregir errores de ESLint |
| `npm run format` | Formatear código con Prettier |
| `npm run typeorm` | Ejecutar CLI de TypeORM |
| `npm run migration:generate` | Generar una nueva migración |
| `npm run migration:run` | Ejecutar migraciones pendientes |
| `npm run migration:revert` | Revertir última migración |
| `npm run schema:sync` | Sincronizar esquema con base de datos (solo dev) |
| `npm run seed` | Poblar base de datos con datos iniciales |

## 📁 Estructura del Proyecto

```
Lifetime-CV-backend/
├── src/
│   ├── config/           # Archivos de configuración (database, jwt, etc.)
│   │   ├── database.ts   # Configuración de TypeORM
│   │   └── jwt.ts        # Configuración de JWT
│   ├── controllers/      # Controladores de rutas
│   ├── middlewares/      # Middlewares personalizados (auth, validación, manejo de errores)
│   ├── entities/         # Entidades de TypeORM (modelos de base de datos)
│   ├── routes/           # Rutas de la API
│   ├── services/         # Lógica de negocio
│   ├── utils/            # Funciones auxiliares
│   ├── validators/       # Esquemas de validación de entrada
│   ├── types/            # Tipos/interfaces de TypeScript
│   ├── migrations/       # Migraciones de TypeORM
│   ├── seeds/            # Archivos de población de base de datos
│   ├── data-source.ts    # Configuración de DataSource de TypeORM
│   └── app.ts            # Configuración de la aplicación Express
├── tests/                # Archivos de test
│   ├── unit/             # Tests unitarios
│   ├── integration/      # Tests de integración
│   └── e2e/              # Tests end-to-end
├── docs/                 # Documentación de la API
├── .github/              # Flujos de trabajo de GitHub Actions
│   └── workflows/
│       ├── ci.yml        # Pipeline de CI
│       └── cd.yml        # Pipeline de CD
├── docker-compose.yml    # Configuración de Docker
├── .env.example          # Variables de entorno de ejemplo
├── .eslintrc.js          # Configuración de ESLint
├── .prettierrc           # Configuración de Prettier
├── jest.config.js        # Configuración de Jest
├── tsconfig.json         # Configuración de TypeScript
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```

## 📚 Documentación de la API

La documentación de la API estará disponible en `http://localhost:3000/api-docs` cuando el servidor esté ejecutándose.

### Endpoints Principales

#### Autenticación
- `POST /api/v1/auth/register` - Registrar nuevo usuario (solo admin)
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/refresh` - Refrescar token de acceso
- `POST /api/v1/auth/logout` - Cerrar sesión

#### Perfil
- `GET /api/v1/profile` - Obtener información del perfil
- `PUT /api/v1/profile` - Actualizar información del perfil

#### Experiencia
- `GET /api/v1/experiences` - Obtener todas las experiencias
- `GET /api/v1/experiences/:id` - Obtener una experiencia
- `POST /api/v1/experiences` - Crear experiencia (requiere autenticación)
- `PUT /api/v1/experiences/:id` - Actualizar experiencia (requiere autenticación)
- `DELETE /api/v1/experiences/:id` - Eliminar experiencia (requiere autenticación)

#### Proyectos
- `GET /api/v1/projects` - Obtener todos los proyectos
- `GET /api/v1/projects/:id` - Obtener un proyecto
- `POST /api/v1/projects` - Crear proyecto (requiere autenticación)
- `PUT /api/v1/projects/:id` - Actualizar proyecto (requiere autenticación)
- `DELETE /api/v1/projects/:id` - Eliminar proyecto (requiere autenticación)

#### Habilidades
- `GET /api/v1/skills` - Obtener todas las habilidades
- `POST /api/v1/skills` - Crear habilidad (requiere autenticación)
- `PUT /api/v1/skills/:id` - Actualizar habilidad (requiere autenticación)
- `DELETE /api/v1/skills/:id` - Eliminar habilidad (requiere autenticación)

#### Contacto
- `POST /api/v1/contact` - Enviar mensaje de contacto

#### Analíticas
- `GET /api/v1/analytics/stats` - Obtener estadísticas del CV (requiere autenticación)
- `GET /api/v1/analytics/github` - Obtener estadísticas de GitHub

#### Exportar
- `GET /api/v1/export/pdf` - Exportar CV como PDF

> **Nota:** La documentación detallada de la API con ejemplos de peticiones/respuestas estará disponible a través de Swagger UI.

## 🧪 Testing

Usamos Jest para testing. Los tests están organizados en tres categorías:

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

### Ejecutar tests en modo observación
```bash
npm run test:watch
```

### Estructura de Tests
- **Tests Unitarios:** Prueban funciones y módulos individuales
- **Tests de Integración:** Prueban endpoints de API e interacciones con la base de datos
- **Tests E2E:** Prueban flujos completos de usuario

## 🤝 Contribuir

Seguimos un flujo de trabajo estructurado de Git. Por favor lee nuestro [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y proceso de desarrollo.

### Estrategia de Ramas

- `main` - Código listo para producción
- `develop` - Rama de integración para features
- `feature/*` - Nuevas funcionalidades
- `bugfix/*` - Corrección de errores
- `hotfix/*` - Correcciones urgentes de producción

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: añadir integración con API de GitHub
fix: resolver problema de expiración de JWT
docs: actualizar documentación de API
style: formatear código con prettier
refactor: reestructurar servicio de autenticación
test: añadir tests para endpoint de contacto
chore: actualizar dependencias
```

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🔗 Proyectos Relacionados

- [Lifetime-CV Frontend](https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-frontend) - Aplicación frontend en Angular

## 👤 Autor

**Tu Nombre**
- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)

## ⭐ Muestra tu apoyo

¡Dale una ⭐️ si este proyecto te ayudó!

---

**Hecho con ❤️ y Express.js**
