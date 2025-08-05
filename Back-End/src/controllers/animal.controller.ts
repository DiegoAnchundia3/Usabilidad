import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllAnimals = async (req: Request, res: Response) => {
  const animals = await prisma.animal.findMany();
  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = await prisma.animal.findUnique({ where: { id: Number(id) } });
  if (!animal) return res.status(404).json({ error: 'Animal no encontrado' });
  res.json(animal);
};

export const createAnimal = async (req: Request, res: Response) => {
  const animal = await prisma.animal.create({ data: req.body });
  res.status(201).json(animal);
};

export const updateAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = await prisma.animal.update({ where: { id: Number(id) }, data: req.body });
  res.json(animal);
};

export const deleteAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.animal.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
