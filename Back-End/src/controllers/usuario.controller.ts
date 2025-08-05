import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsuarios = async (req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

export const createUsuario = async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.create({ data: req.body });
  res.status(201).json(usuario);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.update({ where: { id: Number(id) }, data: req.body });
  res.json(usuario);
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.usuario.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
