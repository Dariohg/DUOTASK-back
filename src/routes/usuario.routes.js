import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

export const router = Router();

router.post("/register", UsuarioController.register);
router.post("/login", UsuarioController.login);
router.get("/validate/:username", UsuarioController.validateUsername);