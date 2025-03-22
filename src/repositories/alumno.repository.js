import db from "../config/db.js";
import { GrupoRepository } from "./grupo.repository.js";

export class AlumnoRepository {
    static getAll() {
        return db.data.alumnos || [];
    }

    static findById(id) {
        return (db.data.alumnos || []).find(alumno => alumno.id === id);
    }

    static findByGrupo(idGrupo) {
        return (db.data.alumnos || []).filter(alumno => alumno.idGrupo === idGrupo);
    }

    static save(alumno) {
        // Inicializar el array de alumnos si no existe
        if (!db.data.alumnos) {
            db.data.alumnos = [];
        }

        // Si el alumno tiene un grupo asignado, actualizamos la relación en el grupo
        if (alumno.idGrupo) {
            GrupoRepository.addAlumnoToGrupo(alumno.idGrupo, alumno.id);
        }

        db.data.alumnos.push(alumno);
        db.write();
        return alumno;
    }

    static update(id, newData) {
        const alumno = this.findById(id);
        if (alumno) {
            // Si el grupo ha cambiado, actualizamos las relaciones
            if (newData.idGrupo !== alumno.idGrupo) {
                // Si tenía un grupo anterior, lo eliminamos de ese grupo
                if (alumno.idGrupo) {
                    GrupoRepository.removeAlumnoFromGrupo(alumno.idGrupo, id);
                }

                // Si tiene un nuevo grupo, lo añadimos a ese grupo
                if (newData.idGrupo) {
                    GrupoRepository.addAlumnoToGrupo(newData.idGrupo, id);
                }
            }

            Object.assign(alumno, newData);
            db.write();
            return alumno;
        }
        return null;
    }

    static delete(id) {
        if (!db.data.alumnos) return false;

        const alumno = this.findById(id);
        if (alumno && alumno.idGrupo) {
            // Eliminar la referencia del alumno en su grupo
            GrupoRepository.removeAlumnoFromGrupo(alumno.idGrupo, id);
        }

        const index = db.data.alumnos.findIndex(alumno => alumno.id === id);
        if (index !== -1) {
            db.data.alumnos.splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}