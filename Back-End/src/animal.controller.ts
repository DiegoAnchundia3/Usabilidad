import { Request, Response } from "express";

export const getAnimals = async (req: Request, res: Response) => {
  // TODO: Implementar lógica para obtener animales desde la base de datos
  res.json([]);
};

export const createAnimal = async (req: Request, res: Response) => {
  // TODO: Implementar lógica para crear un animal en la base de datos
  res.status(201).json({ message: "Animal creado" });
};

export const updateAnimal = async (req: Request, res: Response) => {
  // TODO: Implementar lógica para actualizar un animal en la base de datos
  res.json({ message: "Animal actualizado" });
};

export const deleteAnimal = async (req: Request, res: Response) => {
  // TODO: Implementar lógica para eliminar un animal en la base de datos
  res.json({ message: "Animal eliminado" });
};

export const getAnimalByIdOrName = async (req: Request, res: Response) => {
  // TODO: Implementar lógica para buscar animal por id o nombre
  res.json([]);
};
