import { ActividadService } from "../services/actividad.service.js";

export class ActividadController {
    static async getAll(req, res) {
        try {
            const actividades = await ActividadService.getAllActividades();
            res.json(actividades);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const actividad = await ActividadService.getActividadById(req.params.id);
            res.json(actividad);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByCampos(req, res) {
        try {
            const { idCampoEvaluativo, idCampoFormativo } = req.params;
            const actividades = await ActividadService.getActividadesPorCampos(idCampoEvaluativo, idCampoFormativo);
            res.json(actividades);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { idCampoEvaluativo, idCampoFormativo, nombre } = req.body;
            const actividad = await ActividadService.createActividad(idCampoEvaluativo, idCampoFormativo, nombre);
            res.status(201).json(actividad);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const actividad = await ActividadService.updateActividad(req.params.id, req.body);
            res.json(actividad);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await ActividadService.deleteActividad(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}