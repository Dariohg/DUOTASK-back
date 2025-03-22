import { CalificacionService } from "../services/calificacion.service.js";

export class CalificacionController {
    static async getAll(req, res) {
        try {
            const calificaciones = await CalificacionService.getAllCalificaciones();
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const calificacion = await CalificacionService.getCalificacionById(req.params.id);
            res.json(calificacion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByAlumno(req, res) {
        try {
            const calificaciones = await CalificacionService.getCalificacionesByAlumno(req.params.idAlumno);
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { idActividad, idAlumno, calificacion } = req.body;
            const nuevaCalificacion = await CalificacionService.createCalificacion(
                idActividad,
                idAlumno,
                calificacion
            );
            res.status(201).json(nuevaCalificacion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { calificacion } = req.body;
            const calificacionActualizada = await CalificacionService.updateCalificacion(
                req.params.id,
                calificacion
            );
            res.json(calificacionActualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await CalificacionService.deleteCalificacion(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByActividad(req, res) {
        try {
            const calificaciones = await CalificacionService.getCalificacionesCompletasPorActividad(req.params.idActividad);
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByGrupoYCampos(req, res) {
        try {
            const { idGrupo, idCampoEvaluativo, idCampoFormativo } = req.params;
            const resultado = await CalificacionService.getCalificacionesPorGrupoYCampos(
                idGrupo,
                idCampoEvaluativo,
                idCampoFormativo
            );
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByGrupoYCampoFormativo(req, res) {
        try {
            const { idGrupo, idCampoFormativo } = req.params;
            const resultado = await CalificacionService.getCalificacionesPorGrupoYCampoFormativo(
                idGrupo,
                idCampoFormativo
            );
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByGrupoYCampoEvaluativo(req, res) {
        try {
            const { idGrupo, idCampoEvaluativo } = req.params;
            const resultado = await CalificacionService.getCalificacionesPorGrupoYCampoEvaluativo(
                idGrupo,
                idCampoEvaluativo
            );
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}