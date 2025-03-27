import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as usuarioRoutes } from "./routes/usuario.routes.js";
import { router as alumnoRoutes } from "./routes/alumno.routes.js";
import { router as grupoRoutes } from "./routes/grupo.routes.js";
import { router as campoFormativoRoutes } from "./routes/campoFormativo.routes.js";
import { router as campoEvaluativoRoutes } from "./routes/campoEvaluativo.routes.js";
import { router as actividadRoutes } from "./routes/actividad.routes.js";
import { router as calificacionRoutes } from "./routes/calificacion.routes.js";
import { router as asistenciaRoutes} from "./routes/asistencia.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/grupos", grupoRoutes);
app.use("/api/campos-formativos", campoFormativoRoutes);
app.use("/api/campos-evaluativos", campoEvaluativoRoutes);
app.use("/api/actividades", actividadRoutes);
app.use("/api/calificaciones", calificacionRoutes);
app.use("/api/asistencias", asistenciaRoutes)


// Ruta para verificar que el servidor está funcionando
app.get("/", (req, res) => {
    res.json({ message: "API de Sistema de Calificaciones" });
});

export default app;