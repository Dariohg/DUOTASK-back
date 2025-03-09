import db from "../config/db.js";

export class CalificacionRepository {
    static getAll() {
        return db.data.calificaciones;
    }

    static findById(id) {
        return db.data.calificaciones.find(calificacion => calificacion.id === id);
    }

    static findByAlumno(idAlumno) {
        return db.data.calificaciones.filter(calificacion => calificacion.idAlumno === idAlumno);
    }

    static save(calificacion) {
        db.data.calificaciones.push(calificacion);
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
        const index = db.data.calificaciones.findIndex(calificacion => calificacion.id === id);
        if (index !== -1) {
            db.data.calificaciones.splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}