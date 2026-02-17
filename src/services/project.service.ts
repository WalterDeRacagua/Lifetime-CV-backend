import { AppDataSource } from '../config/database';
import { Project } from '../entities/project.entity';

export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project);

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      order: { order: 'ASC' },
    });
  }

  // Devuelve solamente proyectos destacados para la portada
  async findFeatured(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { featured: true },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async update(id: number, data: Partial<Project>): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, data);
    return this.projectRepository.save(project);
  }

  async delete(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }
}
