import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllRegistrosMedicos = async (req: Request, res: Response) => {
  const registros = await prisma.registroMedico.findMany();
  res.json(registros);
};

export const getRegistroMedicoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const registro = await prisma.registroMedico.findUnique({ where: { id: Number(id) } });
  if (!registro) return res.status(404).json({ error: 'Registro médico no encontrado' });
  res.json(registro);
};

export const createRegistroMedico = async (req: Request, res: Response) => {
  const registro = await prisma.registroMedico.create({ data: req.body });
  res.status(201).json(registro);
};

export const updateRegistroMedico = async (req: Request, res: Response) => {
  const { id } = req.params;
  const registro = await prisma.registroMedico.update({ where: { id: Number(id) }, data: req.body });
  res.json(registro);
};

export const deleteRegistroMedico = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.registroMedico.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
