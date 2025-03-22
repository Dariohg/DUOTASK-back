import db from "../config/db.js";

export class CalificacionRepository {
    static getAll() {
        if (!db.data.calificaciones) {
            db.data.calificaciones = [];
        }
        return db.data.calificaciones;
    }

    static findById(id) {
        return this.getAll().find(calificacion => calificacion.id === id);
    }

    static findByAlumno(idAlumno) {
        return this.getAll().filter(calificacion => calificacion.idAlumno === idAlumno);
    }

    static findByActividad(idActividad) {
        return this.getAll().filter(calificacion => calificacion.idActividad === idActividad);
    }

    static findByAlumnoYActividad(idAlumno, idActividad) {
        return this.getAll().find(
            calificacion => calificacion.idAlumno === idAlumno &&
                calificacion.idActividad === idActividad
        );
    }

    static save(calificacion) {
        this.getAll().push(calificacion);
        db.write();
        return calificacion;
    }

    static update(id, newData) {
        const calificacion = this.findById(id);
        if (calificacion) {
            Object.assign(calificacion, newData);
            db.write();
            return calificacion;
        }
        return null;
    }

    static delete(id) {
        const index = this.getAll().findIndex(calificacion => calificacion.id === id);
        if (index !== -1) {
            this.getAll().splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}