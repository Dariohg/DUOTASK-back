import { AsistenciaService } from "../services/asistencia.service.js";

export class AsistenciaController {
    static async getByGrupo(req, res) {
        try {
            const asistencias = await AsistenciaService.getAsistenciasPorGrupo(req.params.idGrupo);
            res.json(asistencias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByAlumno(req, res) {
        try {
            const asistencias = await AsistenciaService.getAsistenciasPorAlumno(req.params.idAlumno);
            res.json(asistencias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByPeriodo(req, res) {
        try {
            const { idAlumno, inicio, fin } = req.params;
            const asistencias = await AsistenciaService.getAsistenciasPorPeriodo(idAlumno, inicio, fin);
            res.json(asistencias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { idGrupo, asistencias } = req.body;
            const nuevasAsistencias = await AsistenciaService.createAsistencias(idGrupo, asistencias);
            res.status(201).json(nuevasAsistencias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { idAlumno, asistencia } = req.body;
            const actualizado = await AsistenciaService.updateAsistencia(req.params.id, idAlumno, asistencia);
            res.json(actualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await AsistenciaService.deleteAsistencia(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}