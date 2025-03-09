import { Router } from "express";
import { CampoFormativoController } from "../controllers/campoFormativo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate); // Todas las rutas requieren autenticación

router.get("/", CampoFormativoController.getAll);
router.get("/:id", CampoFormativoController.getById);