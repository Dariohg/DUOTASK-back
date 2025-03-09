// src/controllers/grupo.controller.js
import { GrupoService } from "../services/grupo.service.js";

export class GrupoController {
    static async getAll(req, res) {
        try {
            const grupos = await GrupoService.getAllGrupos();
            res.json(grupos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const grupo = await GrupoService.getGrupoById(req.params.id);
            res.json(grupo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { nombre, grado, descripcion } = req.body;
            const grupo = await GrupoService.createGrupo(nombre, grado, descripcion);
            res.status(201).json(grupo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const grupo = await GrupoService.updateGrupo(req.params.id, req.body);
            res.json(grupo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await GrupoService.deleteGrupo(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAlumnos(req, res) {
        try {
            const alumnos = await GrupoService.getAlumnosByGrupo(req.params.id);
            res.json(alumnos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addAlumno(req, res) {
        try {
            const { idAlumno } = req.body;
            if (!idAlumno) {
                return res.status(400).json({ error: "Se requiere el ID del alumno" });
            }

            await GrupoService.addAlumnoToGrupo(req.params.id, idAlumno);
            res.status(200).json({ message: "Alumno añadido al grupo con éxito" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeAlumno(req, res) {
        try {
            const { idAlumno } = req.params;
            await GrupoService.removeAlumnoFromGrupo(req.params.id, idAlumno);
            res.status(200).json({ message: "Alumno removido del grupo con éxito" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}