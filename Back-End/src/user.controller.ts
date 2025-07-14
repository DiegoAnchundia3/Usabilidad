import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ success: false, message: "Usuario y contraseña son requeridos" });
  }
  try {
    const user = await prisma.usuario.findUnique({ where: { usuario } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
    const valid = await bcrypt.compare(contrasena, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        usuario: user.usuario,
        rol: user.rol,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Error en loginUser:", err);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

// CRUD BÁSICO (para pruebas)
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        usuario: true,
        email: true,
        rol: true
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        usuario: true,
        email: true,
        rol: true
      }
    });
    if (!user) return res.status(404).json({ message: "No encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar usuario" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { usuario, email, password, rol } = req.body;
  if (!usuario || !email || !password || !rol) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
    const exists = await prisma.usuario.findUnique({ where: { usuario } });
    if (exists) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: { usuario, email, password: hashed, rol },
      select: { id: true, usuario: true, email: true, rol: true }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { usuario, email, password, rol } = req.body;
  const data: any = {};
  if (usuario) data.usuario = usuario;
  if (email) data.email = email;
  if (rol) data.rol = rol;
  if (password) data.password = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.usuario.update({
      where: { id: Number(req.params.id) },
      data,
      select: { id: true, usuario: true, email: true, rol: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.usuario.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al eliminar usuario" });
  }
};
