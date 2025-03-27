import { Router } from "express";
import { AsistenciaController } from "../controllers/asistencia.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

//router.use(authenticate);

router.get("/grupo/:idGrupo", AsistenciaController.getByGrupo);
router.get("/alumno/:idAlumno", AsistenciaController.getByAlumno);
router.get("/alumno/:idAlumno/periodo/:inicio/:fin", AsistenciaController.getByPeriodo);
router.post("/", AsistenciaController.create);
router.put("/:id", AsistenciaController.update);
router.delete("/:id", AsistenciaController.delete);
