import { Router } from 'express';
import { ContactMessageController } from '../controllers/contact-message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const contactMessageController = new ContactMessageController();

// Ruta PÚBLICA (formulario de contacto)
router.post('/', contactMessageController.create);

// Rutas PRIVADAS (panel admin)
router.get('/', authMiddleware, contactMessageController.getAll);
router.get('/unread', authMiddleware, contactMessageController.getUnread);
router.get('/:id', authMiddleware, contactMessageController.getOne);
router.patch('/:id/read', authMiddleware, contactMessageController.markAsRead);
router.delete('/:id', authMiddleware, contactMessageController.delete);

export default router;
