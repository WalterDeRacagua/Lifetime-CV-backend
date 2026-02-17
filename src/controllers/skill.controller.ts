import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skill.service';

export class SkillController {
  private skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  getAll = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const skills = await this.skillService.findAll();
      response.status(200).json({
        status: 'success',
        data: skills,
      });
    } catch (error) {
      next(error);
    }
  };

  getByCategory = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const category = request.params['category'] ?? '';
      const skills = await this.skillService.findByCategory(category);
      response.status(200).json({
        status: 'success',
        data: skills,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');

      const skill = await this.skillService.findOne(id);
      response.status(200).json({
        status: 'success',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const skill = await this.skillService.create(request.body);
      response.status(201).json({
        status: 'success',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      const skill = await this.skillService.update(id, request.body);
      response.status(200).json({
        status: 'success',
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      await this.skillService.delete(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
