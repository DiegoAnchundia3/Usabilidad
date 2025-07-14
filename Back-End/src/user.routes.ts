import { Router } from "express";
import { loginUser, getUsers, getUserById, createUser, updateUser, deleteUser } from "./user.controller";

const router = Router();

// Login
router.post("/login", loginUser);

// CRUD usuarios (para pruebas, no expongas todo en producción)
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
