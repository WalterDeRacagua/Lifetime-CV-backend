import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Este código se usa para el CLI de typeORM no para la aplicación como tal. Es similar al database.ts
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'lifetime_cv',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
  subscribers: [],
});
