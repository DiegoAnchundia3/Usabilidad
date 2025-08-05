import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllHogaresTemporales = async (req: Request, res: Response) => {
  const hogares = await prisma.hogarTemporal.findMany();
  res.json(hogares);
};

export const getHogarTemporalById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hogar = await prisma.hogarTemporal.findUnique({ where: { id: Number(id) } });
  if (!hogar) return res.status(404).json({ error: 'Hogar temporal no encontrado' });
  res.json(hogar);
};

export const createHogarTemporal = async (req: Request, res: Response) => {
  const hogar = await prisma.hogarTemporal.create({ data: req.body });
  res.status(201).json(hogar);
};

export const updateHogarTemporal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hogar = await prisma.hogarTemporal.update({ where: { id: Number(id) }, data: req.body });
  res.json(hogar);
};

export const deleteHogarTemporal = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.hogarTemporal.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
