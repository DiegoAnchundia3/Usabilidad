import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllAdmins = async (req: Request, res: Response) => {
  const admins = await prisma.usuario.findMany({ where: { tipoUsuario: 'ADMIN' } });
  res.json(admins);
};

export const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await prisma.usuario.findFirst({ where: { id: Number(id), tipoUsuario: 'ADMIN' } });
  if (!admin) return res.status(404).json({ error: 'Administrador no encontrado' });
  res.json(admin);
};

export const createAdmin = async (req: Request, res: Response) => {
  const admin = await prisma.usuario.create({ data: { ...req.body, rol: 'ADMIN' } });
  res.status(201).json(admin);
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await prisma.usuario.update({ where: { id: Number(id) }, data: req.body });
  res.json(admin);
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.usuario.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
