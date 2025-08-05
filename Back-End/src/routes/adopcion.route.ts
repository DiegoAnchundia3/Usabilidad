import { Router } from 'express';
import { getAllAdopciones, getAdopcionById, createAdopcion, updateAdopcion, deleteAdopcion } from '../controllers/adopcion.controller';

const router = Router();

router.get('/', getAllAdopciones);
router.get('/:id', getAdopcionById);
router.post('/', createAdopcion);
router.put('/:id', updateAdopcion);
router.delete('/:id', deleteAdopcion);

export default router;
