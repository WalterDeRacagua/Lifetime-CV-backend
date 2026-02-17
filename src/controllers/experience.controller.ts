import { Request, Response, NextFunction } from 'express';
import { ExperienceService } from '../services/experience.service';

export class ExperienceController {
  private experienceService: ExperienceService;

  constructor() {
    this.experienceService = new ExperienceService();
  }

  getAll = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const experiences = await this.experienceService.findAll();
      response.status(200).json({
        status: 'success',
        data: experiences,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');

      const experience = await this.experienceService.findOne(id);
      response.status(200).json({
        status: 'success',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const experience = await this.experienceService.create(request.body);
      response.status(201).json({
        status: 'success',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      const experience = await this.experienceService.update(id, request.body);
      response.status(200).json({
        status: 'success',
        data: experience,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      await this.experienceService.delete(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
