import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';

const createAdminUser = async (): Promise<void> => {
  try {
    console.log('Connecting to DDBB...');
    await AppDataSource.initialize();
    console.log('Connected!');

    const userRepository = AppDataSource.getRepository(User);

    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@lifetimecv.com' },
    });

    if (existingAdmin) {
      console.log('Admin user already created');
      await AppDataSource.destroy();
    }

    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    const adminUser = userRepository.create({
      email: 'admin@lifetimecv.com',
      password: hashedPassword,
      name: 'Administrator',
    });
    console.log('Admin user created successfully');
    console.log('Email: admin@lifetimecv.com');
    console.log('Password: Admin123!');

    await userRepository.save(adminUser);

    await AppDataSource.destroy();
  } catch {
    process.exit(1);
  }
};

createAdminUser();
