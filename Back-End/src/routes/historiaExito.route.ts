import { Router } from 'express';
import { getAllHistoriasExito, getHistoriaExitoById, createHistoriaExito, updateHistoriaExito, deleteHistoriaExito } from '../controllers/historiaExito.controller';

const router = Router();

router.get('/', getAllHistoriasExito);
router.get('/:id', getHistoriaExitoById);
router.post('/', createHistoriaExito);
router.put('/:id', updateHistoriaExito);
router.delete('/:id', deleteHistoriaExito);

export default router;
