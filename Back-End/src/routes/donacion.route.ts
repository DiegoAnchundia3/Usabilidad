import { Router } from 'express';
import { getAllDonaciones, getDonacionById, createDonacion, updateDonacion, deleteDonacion } from '../controllers/donacion.controller';

const router = Router();

router.get('/', getAllDonaciones);
router.get('/:id', getDonacionById);
router.post('/', createDonacion);
router.put('/:id', updateDonacion);
router.delete('/:id', deleteDonacion);

export default router;
