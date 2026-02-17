import { AppDataSource } from '../config/database';
import { ContactMessage } from '../entities/contact-message.entity';

export class ContactMessageService {
  private contactMessageRepository = AppDataSource.getRepository(ContactMessage);

  async findAll(): Promise<ContactMessage[]> {
    return this.contactMessageRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findUnread(): Promise<ContactMessage[]> {
    return this.contactMessageRepository.find({
      where: { isRead: false },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactMessage> {
    const message = await this.contactMessageRepository.findOne({ where: { id } });
    if (!message) throw new Error('Message not found');
    return message;
  }

  async create(data: Partial<ContactMessage>): Promise<ContactMessage> {
    const message = this.contactMessageRepository.create(data);
    return this.contactMessageRepository.save(message);
  }

  async markAsRead(id: number): Promise<ContactMessage> {
    const message = await this.findOne(id);
    message.isRead = true;
    return this.contactMessageRepository.save(message);
  }

  async delete(id: number): Promise<void> {
    const message = await this.findOne(id);
    await this.contactMessageRepository.remove(message);
  }
}
