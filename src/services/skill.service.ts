import { AppDataSource } from '../config/database';
import { Skill } from '../entities/skill.entity';

export class SkillService {
  private skillRepository = AppDataSource.getRepository(Skill);

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find({
      order: { order: 'ASC' },
    });
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { category },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
    });

    if (!skill) {
      throw new Error('Skill not found');
    }

    return skill;
  }

  async create(data: Partial<Skill>): Promise<Skill> {
    const skill = this.skillRepository.create(data);
    return this.skillRepository.save(skill);
  }

  async update(id: number, data: Partial<Skill>): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, data);
    return this.skillRepository.save(skill);
  }

  async delete(id: number): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepository.remove(skill);
  }
}
