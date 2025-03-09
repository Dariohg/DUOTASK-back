import { Router } from "express";
import { CalificacionController } from "../controllers/calificacion.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate); // Todas las rutas requieren autenticación

router.get("/", CalificacionController.getAll);
router.get("/completas", CalificacionController.getCalificacionesCompletas);
router.get("/:id", CalificacionController.getById);
router.get("/alumno/:idAlumno", CalificacionController.getByAlumno);
router.post("/", CalificacionController.create);
router.put("/:id", CalificacionController.update);
router.delete("/:id", CalificacionController.delete);