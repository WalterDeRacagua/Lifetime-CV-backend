import { Router } from 'express';
import { SkillController } from '../controllers/skill.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const skillController = new SkillController();

// Rutas PÚBLICAS
router.get('/', skillController.getAll);
router.get('/category/:category', skillController.getByCategory);
router.get('/:id', skillController.getOne);

// Rutas PRIVADAS
router.post('/', authMiddleware, skillController.create);
router.put('/:id', authMiddleware, skillController.update);
router.delete('/:id', authMiddleware, skillController.delete);

export default router;
