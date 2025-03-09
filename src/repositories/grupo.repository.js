import db from "../config/db.js";

export class GrupoRepository {
    static getAll() {
        return db.data.grupos || [];
    }

    static findById(id) {
        return (db.data.grupos || []).find(grupo => grupo.id === id);
    }

    static save(grupo) {
        // Inicializar el array de grupos si no existe
        if (!db.data.grupos) {
            db.data.grupos = [];
        }
        db.data.grupos.push(grupo);
        db.write();
        return grupo;
    }

    static update(id, newData) {
        const grupo = this.findById(id);
        if (grupo) {
            Object.assign(grupo, newData);
            db.write();
            return grupo;
        }
        return null;
    }

    static delete(id) {
        if (!db.data.grupos) return false;

        const index = db.data.grupos.findIndex(grupo => grupo.id === id);
        if (index !== -1) {
            db.data.grupos.splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }

    static addAlumnoToGrupo(idGrupo, idAlumno) {
        const grupo = this.findById(idGrupo);
        if (grupo) {
            // Evitar duplicados
            if (!grupo.alumnos.includes(idAlumno)) {
                grupo.alumnos.push(idAlumno);
                db.write();
            }
            return true;
        }
        return false;
    }

    static removeAlumnoFromGrupo(idGrupo, idAlumno) {
        const grupo = this.findById(idGrupo);
        if (grupo && grupo.alumnos) {
            const index = grupo.alumnos.indexOf(idAlumno);
            if (index !== -1) {
                grupo.alumnos.splice(index, 1);
                db.write();
                return true;
            }
        }
        return false;
    }
}