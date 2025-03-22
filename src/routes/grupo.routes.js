import { Router } from "express";
import { GrupoController } from "../controllers/grupo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate);

// Rutas básicas de CRUD
router.get("/", GrupoController.getAll);
router.get("/:id", GrupoController.getById);
router.post("/", GrupoController.create);
router.put("/:id", GrupoController.update);
router.delete("/:id", GrupoController.delete);

// Rutas para gestionar alumnos en grupos
router.get("/:id/alumnos", GrupoController.getAlumnos);
router.post("/:id/alumnos", GrupoController.addAlumno);
router.delete("/:id/alumnos/:idAlumno", GrupoController.removeAlumno);