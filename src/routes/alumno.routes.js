import { Router } from "express";
import { AlumnoController } from "../controllers/alumno.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate); // Todas las rutas requieren autenticación

router.get("/", AlumnoController.getAll);
router.get("/:id", AlumnoController.getById);
router.post("/", AlumnoController.create);
router.put("/:id", AlumnoController.update);
router.delete("/:id", AlumnoController.delete);