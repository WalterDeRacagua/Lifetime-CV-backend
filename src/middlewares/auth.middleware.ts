import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

const authService = new AuthService();

/**
 * Este middleware sirve para comprobar que el token sea válido. Tener un token válido es la única
 * forma de poder acceder
 */
export const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.status(401).json({
        status: 'error',
        message: 'No authorization header provided',
      });
      return;
    }
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      response.status(401).json({
        status: 'error',
        message: 'Invalid authorization format. Use Bearer <token>',
      });

      return;
    }

    const token = parts[1];

    if (!token) {
      response.status(401).json({
        status: 'error',
        message: 'Token not provided',
      });
      return;
    }

    const payload = authService.verifyAccessToken(token);

    request.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    response.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};
