import { Router } from "express";
import { CalificacionController } from "../controllers/calificacion.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate);

// Rutas básicas CRUD
router.get("/", CalificacionController.getAll);
router.get("/:id", CalificacionController.getById);
router.post("/", CalificacionController.create);
router.put("/:id", CalificacionController.update);
router.delete("/:id", CalificacionController.delete);

// Rutas adicionales
router.get("/alumno/:idAlumno", CalificacionController.getByAlumno);
router.get("/actividad/:idActividad", CalificacionController.getByActividad);

// Ruta para obtener calificaciones por grupo y campos
router.get("/grupo/:idGrupo/evaluativo/:idCampoEvaluativo/formativo/:idCampoFormativo",
    CalificacionController.getByGrupoYCampos);

// Calificaciones por grupo y campo formativo
router.get("/grupo/:idGrupo/formativo/:idCampoFormativo",
    CalificacionController.getByGrupoYCampoFormativo);

// Calificaciones por grupo y campo evaluativo
router.get("/grupo/:idGrupo/evaluativo/:idCampoEvaluativo",
    CalificacionController.getByGrupoYCampoEvaluativo);