import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';

interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
  };

  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  userId: number;
  email: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Invalid email, user not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'secret_key', {
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh_secret_key', {
      expiresIn: '7d',
    });
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret_key') as JwtPayload;
    } catch (error) {
      throw new Error('Access token expired');
    }
  }

  // Refreshing access token using refresh token
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh-secret-key') as JwtPayload;

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return this.generateAccessToken(user);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
