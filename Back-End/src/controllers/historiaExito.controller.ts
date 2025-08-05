import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllHistoriasExito = async (req: Request, res: Response) => {
  const historias = await prisma.historiaExito.findMany();
  res.json(historias);
};

export const getHistoriaExitoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const historia = await prisma.historiaExito.findUnique({ where: { id: Number(id) } });
  if (!historia) return res.status(404).json({ error: 'Historia de éxito no encontrada' });
  res.json(historia);
};

export const createHistoriaExito = async (req: Request, res: Response) => {
  const historia = await prisma.historiaExito.create({ data: req.body });
  res.status(201).json(historia);
};

export const updateHistoriaExito = async (req: Request, res: Response) => {
  const { id } = req.params;
  const historia = await prisma.historiaExito.update({ where: { id: Number(id) }, data: req.body });
  res.json(historia);
};

export const deleteHistoriaExito = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.historiaExito.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
