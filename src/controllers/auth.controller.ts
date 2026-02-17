import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  // POST /api/v1/auth/login
  login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = request.body;

      const result = await this.authService.login(email, password);

      response.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/auth/refresh
  refresh = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = request.body;

      if (!refreshToken) {
        response.status(400).json({
          status: 'error',
          message: 'Refresh token is required',
        });
      }

      const accessToken = await this.authService.refreshAccessToken(refreshToken);

      response.status(200).json({
        status: 'success',
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/auth/me
  me = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      response.status(200).json({
        status: 'success',
        data: {
          user: request.user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
