import { Router } from "express";
import multer from "multer";
import { getAnimals, createAnimal, updateAnimal, deleteAnimal, getAnimalByIdOrName } from "./animal.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAnimals);
router.post("/", upload.single("imagen"), createAnimal);
router.put("/:id", upload.single("imagen"), updateAnimal);
router.delete("/:id", deleteAnimal);
router.get("/search", getAnimalByIdOrName);

export default router;
