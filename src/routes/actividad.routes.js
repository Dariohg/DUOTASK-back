import { Router } from "express";
import { ActividadController } from "../controllers/actividad.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate);

// Rutas básicas CRUD
router.get("/", ActividadController.getAll);
router.get("/:id", ActividadController.getById);
router.post("/", ActividadController.create);
router.put("/:id", ActividadController.update);
router.delete("/:id", ActividadController.delete);

// Rutas adicionales
router.get("/campos/:idCampoEvaluativo/:idCampoFormativo", ActividadController.getByCampos);