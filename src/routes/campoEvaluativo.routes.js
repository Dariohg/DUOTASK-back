import { Router } from "express";
import { CampoEvaluativoController } from "../controllers/campoEvaluativo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate);

router.get("/", CampoEvaluativoController.getAll);
router.get("/:id", CampoEvaluativoController.getById);