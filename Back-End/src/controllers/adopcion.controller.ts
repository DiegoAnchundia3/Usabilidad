import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllAdopciones = async (req: Request, res: Response) => {
  const adopciones = await prisma.adopcion.findMany();
  res.json(adopciones);
};

export const getAdopcionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adopcion = await prisma.adopcion.findUnique({ where: { id: Number(id) } });
  if (!adopcion) return res.status(404).json({ error: 'Adopción no encontrada' });
  res.json(adopcion);
};

export const createAdopcion = async (req: Request, res: Response) => {
  const adopcion = await prisma.adopcion.create({ data: req.body });
  res.status(201).json(adopcion);
};

export const updateAdopcion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adopcion = await prisma.adopcion.update({ where: { id: Number(id) }, data: req.body });
  res.json(adopcion);
};

export const deleteAdopcion = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.adopcion.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
