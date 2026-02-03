import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    console.log('Connecting to BBDD');
    await AppDataSource.initialize();
    console.log('Database connected succesfully');

    app.listen(PORT, () => {
      console.log('Server is running');
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error starting server: ', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', async () => {
  console.log('\n ⚠️  SIGTERM received, closing server gracefully...');
  await AppDataSource.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n ⚠️  SIGINT received, closing server gracefully...');
  await AppDataSource.destroy();
  process.exit(0);
});
