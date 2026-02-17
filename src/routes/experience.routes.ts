import { Router } from 'express';
import { ExperienceController } from '../controllers/experience.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const experienceController = new ExperienceController();

// No necesita autenticación
router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getOne);

//Rutas privadas
router.post('/', authMiddleware, experienceController.create);
router.put('/:id', authMiddleware, experienceController.update);
router.delete('/:id', authMiddleware, experienceController.delete);

export default router;
