import { AppDataSource } from '../config/database';
import { Experience } from '../entities/experience.entity';

export class ExperienceService {
  private experienceRepository = AppDataSource.getRepository(Experience);

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find({
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
    });

    if (!experience) {
      throw new Error('Experience not found');
    }

    return experience;
  }

  async create(data: Partial<Experience>): Promise<Experience> {
    const experience = this.experienceRepository.create(data);
    return this.experienceRepository.save(experience);
  }

  async update(id: number, data: Partial<Experience>): Promise<Experience> {
    const experience = await this.findOne(id);
    Object.assign(experience, data);
    return this.experienceRepository.save(experience);
  }

  async delete(id: number): Promise<void> {
    const experience = await this.findOne(id);
    await this.experienceRepository.remove(experience);
  }
}
