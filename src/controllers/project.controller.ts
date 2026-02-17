import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  getAll = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.projectService.findAll();
      response.status(200).json({
        status: 'success',
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getFeatured = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const featuredProjects = await this.projectService.findFeatured();
      response.status(200).json({
        status: 'success',
        data: featuredProjects,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');

      const project = await this.projectService.findOne(id);
      response.status(200).json({
        status: 'success',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const project = await this.projectService.create(request.body);
      response.status(201).json({
        status: 'success',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      const project = await this.projectService.update(id, request.body);
      response.status(200).json({
        status: 'success',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(request.params['id'] ?? '0');
      await this.projectService.delete(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
