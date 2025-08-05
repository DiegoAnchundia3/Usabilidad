import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllVoluntariados = async (req: Request, res: Response) => {
  const voluntariados = await prisma.voluntariado.findMany();
  res.json(voluntariados);
};

export const getVoluntariadoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const voluntariado = await prisma.voluntariado.findUnique({ where: { id: Number(id) } });
  if (!voluntariado) return res.status(404).json({ error: 'Voluntariado no encontrado' });
  res.json(voluntariado);
};

export const createVoluntariado = async (req: Request, res: Response) => {
  const voluntariado = await prisma.voluntariado.create({ data: req.body });
  res.status(201).json(voluntariado);
};

export const updateVoluntariado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const voluntariado = await prisma.voluntariado.update({ where: { id: Number(id) }, data: req.body });
  res.json(voluntariado);
};

export const deleteVoluntariado = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.voluntariado.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
