import { Router } from 'express';
import { getAllRegistrosMedicos, getRegistroMedicoById, createRegistroMedico, updateRegistroMedico, deleteRegistroMedico } from '../controllers/registroMedico.controller';

const router = Router();

router.get('/', getAllRegistrosMedicos);
router.get('/:id', getRegistroMedicoById);
router.post('/', createRegistroMedico);
router.put('/:id', updateRegistroMedico);
router.delete('/:id', deleteRegistroMedico);

export default router;
