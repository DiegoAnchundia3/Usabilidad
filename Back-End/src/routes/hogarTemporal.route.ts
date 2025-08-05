import { Router } from 'express';
import { getAllHogaresTemporales, getHogarTemporalById, createHogarTemporal, updateHogarTemporal, deleteHogarTemporal } from '../controllers/hogarTemporal.controller';

const router = Router();

router.get('/', getAllHogaresTemporales);
router.get('/:id', getHogarTemporalById);
router.post('/', createHogarTemporal);
router.put('/:id', updateHogarTemporal);
router.delete('/:id', deleteHogarTemporal);

export default router;
