import { GrupoRepository } from "../repositories/grupo.repository.js";
import { AlumnoRepository } from "../repositories/alumno.repository.js";
import { Grupo } from "../models/grupo.model.js";
import { v4 as uuidv4 } from "uuid";

export class GrupoService {
    static async getAllGrupos() {
        return GrupoRepository.getAll();
    }

    static async getGrupoById(id) {
        const grupo = GrupoRepository.findById(id);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }
        return grupo;
    }

    static async createGrupo(nombre, grado, descripcion) {
        if (!nombre || !grado) {
            throw new Error("Nombre y grado son campos obligatorios");
        }

        // Validar que el nombre y grado sean únicos
        const grupos = GrupoRepository.getAll();
        const duplicado = grupos.find(g => g.nombre === nombre && g.grado === grado);
        if (duplicado) {
            throw new Error(`Ya existe un grupo con nombre '${nombre}' en el grado ${grado}`);
        }

        const newGrupo = new Grupo(uuidv4(), nombre, grado, descripcion);
        return GrupoRepository.save(newGrupo);
    }

    static async updateGrupo(id, newData) {
        const grupo = GrupoRepository.findById(id);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Validar que el nombre y grado sean únicos si se están cambiando
        if ((newData.nombre && newData.nombre !== grupo.nombre) ||
            (newData.grado && newData.grado !== grupo.grado)) {

            const grupos = GrupoRepository.getAll();
            const duplicado = grupos.find(g =>
                g.id !== id &&
                g.nombre === (newData.nombre || grupo.nombre) &&
                g.grado === (newData.grado || grupo.grado)
            );

            if (duplicado) {
                throw new Error(`Ya existe un grupo con ese nombre y grado`);
            }
        }

        return GrupoRepository.update(id, newData);
    }

    static async deleteGrupo(id) {
        const grupo = GrupoRepository.findById(id);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Verificar si hay alumnos en este grupo
        const alumnosEnGrupo = AlumnoRepository.findByGrupo(id);
        if (alumnosEnGrupo.length > 0) {
            throw new Error("No se puede eliminar un grupo que tiene alumnos asignados");
        }

        return GrupoRepository.delete(id);
    }

    static async getAlumnosByGrupo(idGrupo) {
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        return AlumnoRepository.findByGrupo(idGrupo);
    }

    static async addAlumnoToGrupo(idGrupo, idAlumno) {
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        // Actualizar el alumno para asignarle el grupo
        alumno.idGrupo = idGrupo;
        AlumnoRepository.update(idAlumno, alumno);

        // También añadimos al alumno a la lista de alumnos del grupo
        return GrupoRepository.addAlumnoToGrupo(idGrupo, idAlumno);
    }

    static async removeAlumnoFromGrupo(idGrupo, idAlumno) {
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        if (alumno.idGrupo !== idGrupo) {
            throw new Error("El alumno no pertenece a este grupo");
        }

        // Actualizar el alumno para eliminar la referencia al grupo
        alumno.idGrupo = null;
        AlumnoRepository.update(idAlumno, alumno);

        // También eliminamos al alumno de la lista de alumnos del grupo
        return GrupoRepository.removeAlumnoFromGrupo(idGrupo, idAlumno);
    }
}