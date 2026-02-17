import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const projectController = new ProjectController();

// Rutas PÚBLICAS
router.get('/', projectController.getAll);
router.get('/featured', projectController.getFeatured);
router.get('/:id', projectController.getOne);

// Rutas PRIVADAS
router.post('/', authMiddleware, projectController.create);
router.put('/:id', authMiddleware, projectController.update);
router.delete('/:id', authMiddleware, projectController.delete);

export default router;
