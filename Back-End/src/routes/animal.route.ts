import { Router } from 'express';
import { getAllAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal } from '../controllers/animal.controller';

const router = Router();

router.get('/', getAllAnimals);
router.get('/:id', getAnimalById);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;
