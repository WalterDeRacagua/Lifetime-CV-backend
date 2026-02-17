import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
dotenv.config();

const app: Application = express();

// =====================
// MIDDLEWARES
// =====================

// Para tener headers seguros
app.use(helmet());

// Permitir peticiones desde el frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  }),
);

// Comprensión: Comprimir respuestas.
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({
    status: 'ok',
    message: 'Lifetime CV API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/', (_request: Request, response: Response) => {
  response.status(200).json({
    message: 'Welcome to lifetime CV API',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

// API Routes - Aquí irán todas las rutas de la API
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/experiences', experienceRoutes);

app.use((request: Request, response: Response) => {
  response.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: request.path,
  });
});

interface HttpError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, _request: Request, response: Response, _next: NextFunction) => {
  console.error('Error: ', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  response.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err,
    }),
  });
});

export default app;
