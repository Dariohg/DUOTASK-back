import { CalificacionService } from "../services/calificacion.service.js";

export class CalificacionController {
    static async getAll(req, res) {
        try {
            const calificaciones = await CalificacionService.getAllCalificaciones();
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async getById(req, res) {
        try {
            const calificacion = await CalificacionService.getCalificacionById(req.params.id);
            res.json(calificacion);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async getByAlumno(req, res) {
        try {
            const calificaciones = await CalificacionService.getCalificacionesByAlumno(req.params.idAlumno);
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async create(req, res) {
        try {
            const {idAlumno, idCampoEvaluativo, idCampoFormativo, calificacion} = req.body;
            const nuevaCalificacion = await CalificacionService.createCalificacion(
                idAlumno,
                idCampoEvaluativo,
                idCampoFormativo,
                calificacion
            );
            res.status(201).json(nuevaCalificacion);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async update(req, res) {
        try {
            const {calificacion} = req.body;
            const calificacionActualizada = await CalificacionService.updateCalificacion(
                req.params.id,
                calificacion
            );
            res.json(calificacionActualizada);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async delete(req, res) {
        try {
            await CalificacionService.deleteCalificacion(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async getCalificacionesCompletas(req, res) {
        try {
            const calificaciones = await CalificacionService.getCalificacionesCompletas();
            res.json(calificaciones);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}