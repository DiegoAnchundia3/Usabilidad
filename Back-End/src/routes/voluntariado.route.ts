import { Router } from 'express';
import { getAllVoluntariados, getVoluntariadoById, createVoluntariado, updateVoluntariado, deleteVoluntariado } from '../controllers/voluntariado.controller';

const router = Router();

router.get('/', getAllVoluntariados);
router.get('/:id', getVoluntariadoById);
router.post('/', createVoluntariado);
router.put('/:id', updateVoluntariado);
router.delete('/:id', deleteVoluntariado);

export default router;
