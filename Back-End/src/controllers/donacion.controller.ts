import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllDonaciones = async (req: Request, res: Response) => {
  const donaciones = await prisma.donacion.findMany();
  res.json(donaciones);
};

export const getDonacionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const donacion = await prisma.donacion.findUnique({ where: { id: Number(id) } });
  if (!donacion) return res.status(404).json({ error: 'Donación no encontrada' });
  res.json(donacion);
};

export const createDonacion = async (req: Request, res: Response) => {
  const donacion = await prisma.donacion.create({ data: req.body });
  res.status(201).json(donacion);
};

export const updateDonacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const donacion = await prisma.donacion.update({ where: { id: Number(id) }, data: req.body });
  res.json(donacion);
};

export const deleteDonacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.donacion.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
