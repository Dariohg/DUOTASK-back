// src/controllers/alumno.controller.js
import { AlumnoService } from "../services/alumno.service.js";

export class AlumnoController {
    static async getAll(req, res) {
        try {
            const alumnos = await AlumnoService.getAllAlumnos();
            res.json(alumnos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const alumno = await AlumnoService.getAlumnoById(req.params.id);
            res.json(alumno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { nombre, apellido, idGrupo } = req.body;
            const alumno = await AlumnoService.createAlumno(nombre, apellido, idGrupo);
            res.status(201).json(alumno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const alumno = await AlumnoService.updateAlumno(req.params.id, req.body);
            res.json(alumno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await AlumnoService.deleteAlumno(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getGrupo(req, res) {
        try {
            const grupo = await AlumnoService.getGrupoDeAlumno(req.params.id);
            if (!grupo) {
                return res.json({ message: "El alumno no pertenece a ningún grupo" });
            }
            res.json(grupo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async asignarGrupo(req, res) {
        try {
            const { idGrupo } = req.body;
            if (!idGrupo) {
                return res.status(400).json({ error: "Se requiere el ID del grupo" });
            }

            const alumno = await AlumnoService.asignarGrupo(req.params.id, idGrupo);
            res.json({ message: "Alumno asignado al grupo con éxito", alumno });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removerDeGrupo(req, res) {
        try {
            const alumno = await AlumnoService.removerDeGrupo(req.params.id);
            res.json({ message: "Alumno removido del grupo con éxito", alumno });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}