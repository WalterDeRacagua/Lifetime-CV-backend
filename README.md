# Lifetime-CV Backend

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇫🇷 Français](README.fr.md) | [🇩🇪 Deutsch](README.de.md)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Express](https://img.shields.io/badge/express-5.x-lightgrey.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-16.x-blue.svg)

Backend API built with Express.js and PostgreSQL for Lifetime-CV project - A dynamic CV management system with multilingual support.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 📖 About

Lifetime-CV Backend is a RESTful API that powers a dynamic, multilingual CV management system. It provides secure endpoints for authentication, content management, contact forms, and analytics.

This backend supports the [Lifetime-CV Frontend](https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-frontend) application.

## ✨ Features

- 🔐 JWT-based authentication system
- 🌍 Multilingual content support (Spanish, English, French, German)
- 📧 Contact form with email integration
- 📊 Analytics and statistics tracking
- 🎨 Dynamic content management (experiences, projects, skills)
- 🔗 GitHub API integration
- 📄 PDF generation for CV export
- 🛡️ Input validation and security middleware
- 🧪 Comprehensive test coverage

## 🛠️ Tech Stack

- **Runtime:** Node.js (>= 18.x)
- **Framework:** Express.js 5.x
- **Database:** PostgreSQL 16.x
- **ORM:** Prisma / TypeORM (to be decided)
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Express-validator / Joi
- **Testing:** Jest + Supertest
- **Email:** Nodemailer
- **API Documentation:** Swagger / OpenAPI
- **Code Quality:** ESLint + Prettier
- **Container:** Docker + Docker Compose

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v16.x or higher)
- [Docker](https://www.docker.com/) (optional, for containerized database)
- [Git](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-backend.git
cd Lifetime-CV-backend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Environment Variables](#environment-variables) section).

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/lifetime_cv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lifetime_cv
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@lifetime-cv.com

# GitHub API (optional)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:4200

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🗄️ Database Setup

### Option 1: Using Docker (Recommended for development)

```bash
# Start PostgreSQL container
docker-compose up -d

# The database will be available at localhost:5432
```

### Option 2: Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create a database:

```bash
psql -U postgres
CREATE DATABASE lifetime_cv;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE lifetime_cv TO your_username;
\q
```

3. Run migrations:

```bash
npm run migrate
# or
npm run db:push
```

4. Seed the database (optional):

```bash
npm run seed
```

## ▶️ Running the Application

### Development mode with hot-reload

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm start` | Start production server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run migrate` | Run database migrations |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open database studio (Prisma) |
| `npm run seed` | Seed database with initial data |

## 📁 Project Structure

```
Lifetime-CV-backend/
├── src/
│   ├── config/           # Configuration files (database, jwt, etc.)
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares (auth, validation, error handling)
│   ├── models/           # Database models/schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   ├── validators/       # Input validation schemas
│   ├── types/            # TypeScript types/interfaces
│   └── app.js            # Express app configuration
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Migration files
│   └── seed.js           # Database seeding
├── docs/                 # API documentation
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml        # CI pipeline
│       └── cd.yml        # CD pipeline
├── docker-compose.yml    # Docker configuration
├── .env.example          # Example environment variables
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 📚 API Documentation

API documentation will be available at `http://localhost:3000/api-docs` when running the server.

### Main Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user (admin only)
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

#### Profile
- `GET /api/v1/profile` - Get profile information
- `PUT /api/v1/profile` - Update profile information

#### Experience
- `GET /api/v1/experiences` - Get all experiences
- `GET /api/v1/experiences/:id` - Get single experience
- `POST /api/v1/experiences` - Create experience (auth required)
- `PUT /api/v1/experiences/:id` - Update experience (auth required)
- `DELETE /api/v1/experiences/:id` - Delete experience (auth required)

#### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/:id` - Get single project
- `POST /api/v1/projects` - Create project (auth required)
- `PUT /api/v1/projects/:id` - Update project (auth required)
- `DELETE /api/v1/projects/:id` - Delete project (auth required)

#### Skills
- `GET /api/v1/skills` - Get all skills
- `POST /api/v1/skills` - Create skill (auth required)
- `PUT /api/v1/skills/:id` - Update skill (auth required)
- `DELETE /api/v1/skills/:id` - Delete skill (auth required)

#### Contact
- `POST /api/v1/contact` - Send contact message

#### Analytics
- `GET /api/v1/analytics/stats` - Get CV statistics (auth required)
- `GET /api/v1/analytics/github` - Get GitHub statistics

#### Export
- `GET /api/v1/export/pdf` - Export CV as PDF

> **Note:** Detailed API documentation with request/response examples will be available via Swagger UI.

## 🧪 Testing

We use Jest for testing. Tests are organized in three categories:

### Run all tests
```bash
npm test
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Test Structure
- **Unit Tests:** Test individual functions and modules
- **Integration Tests:** Test API endpoints and database interactions
- **E2E Tests:** Test complete user flows

## 🤝 Contributing

We follow a structured Git workflow. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add GitHub API integration
fix: resolve JWT expiration issue
docs: update API documentation
style: format code with prettier
refactor: restructure auth service
test: add tests for contact endpoint
chore: update dependencies
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Projects

- [Lifetime-CV Frontend](https://github.com/YOUR_GITHUB_USERNAME/Lifetime-CV-frontend) - Angular frontend application

## 👤 Author

**Your Name**
- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ and Express.js**
