// src/services/alumno.service.js
import { AlumnoRepository } from "../repositories/alumno.repository.js";
import { GrupoRepository } from "../repositories/grupo.repository.js";
import { Alumno } from "../models/alumno.model.js";
import { v4 as uuidv4 } from "uuid";

export class AlumnoService {
    static async getAllAlumnos() {
        return AlumnoRepository.getAll();
    }

    static async getAlumnoById(id) {
        const alumno = AlumnoRepository.findById(id);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }
        return alumno;
    }

    static async createAlumno(nombre, apellido, idGrupo = null) {
        if (!nombre || !apellido) {
            throw new Error("Nombre y apellido son obligatorios");
        }

        // Verificar si el grupo existe, si se proporcionó uno
        if (idGrupo) {
            const grupo = GrupoRepository.findById(idGrupo);
            if (!grupo) {
                throw new Error("El grupo especificado no existe");
            }
        }

        const newAlumno = new Alumno(uuidv4(), nombre, apellido, idGrupo);
        return AlumnoRepository.save(newAlumno);
    }

    static async updateAlumno(id, newData) {
        const alumno = AlumnoRepository.findById(id);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        // Verificar si el nuevo grupo existe, si se está cambiando
        if (newData.idGrupo && newData.idGrupo !== alumno.idGrupo) {
            const grupo = GrupoRepository.findById(newData.idGrupo);
            if (!grupo) {
                throw new Error("El grupo especificado no existe");
            }
        }

        return AlumnoRepository.update(id, newData);
    }

    static async deleteAlumno(id) {
        const alumno = AlumnoRepository.findById(id);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }
        return AlumnoRepository.delete(id);
    }

    static async getGrupoDeAlumno(id) {
        const alumno = AlumnoRepository.findById(id);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        if (!alumno.idGrupo) {
            return null; // El alumno no pertenece a ningún grupo
        }

        return GrupoRepository.findById(alumno.idGrupo);
    }

    static async asignarGrupo(idAlumno, idGrupo) {
        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Si el alumno ya pertenecía a otro grupo, lo removemos de ese grupo
        if (alumno.idGrupo && alumno.idGrupo !== idGrupo) {
            GrupoRepository.removeAlumnoFromGrupo(alumno.idGrupo, idAlumno);
        }

        // Actualizamos el alumno y lo añadimos al nuevo grupo
        alumno.idGrupo = idGrupo;
        AlumnoRepository.update(idAlumno, alumno);
        GrupoRepository.addAlumnoToGrupo(idGrupo, idAlumno);

        return alumno;
    }

    static async removerDeGrupo(idAlumno) {
        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        if (!alumno.idGrupo) {
            throw new Error("El alumno no pertenece a ningún grupo");
        }

        const idGrupo = alumno.idGrupo;
        GrupoRepository.removeAlumnoFromGrupo(idGrupo, idAlumno);

        alumno.idGrupo = null;
        return AlumnoRepository.update(idAlumno, alumno);
    }
}