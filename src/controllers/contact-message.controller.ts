import { Request, Response, NextFunction } from 'express';
import { ContactMessageService } from '../services/contact-message.service';

export class ContactMessageController {
  private contactMessageService: ContactMessageService;

  constructor() {
    this.contactMessageService = new ContactMessageService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await this.contactMessageService.findAll();
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      next(error);
    }
  };

  getUnread = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await this.contactMessageService.findUnread();
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params['id'] ?? '0');
      const message = await this.contactMessageService.findOne(id);
      res.status(200).json({ status: 'success', data: message });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const message = await this.contactMessageService.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Message sent successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params['id'] ?? '0');
      const message = await this.contactMessageService.markAsRead(id);
      res.status(200).json({ status: 'success', data: message });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params['id'] ?? '0');
      await this.contactMessageService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
