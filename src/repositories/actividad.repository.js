import db from "../config/db.js";

export class ActividadRepository {
    static getAll() {
        if (!db.data.actividades) {
            db.data.actividades = [];
        }
        return db.data.actividades;
    }

    static findById(id) {
        return this.getAll().find(actividad => actividad.id === id);
    }

    static findByCampos(idCampoEvaluativo, idCampoFormativo) {
        return this.getAll().filter(
            actividad => actividad.idCampoEvaluativo === idCampoEvaluativo &&
                actividad.idCampoFormativo === idCampoFormativo
        );
    }

    static save(actividad) {
        this.getAll().push(actividad);
        db.write();
        return actividad;
    }

    static update(id, newData) {
        const actividad = this.findById(id);
        if (actividad) {
            Object.assign(actividad, newData);
            db.write();
            return actividad;
        }
        return null;
    }

    static delete(id) {
        const index = this.getAll().findIndex(actividad => actividad.id === id);
        if (index !== -1) {
            this.getAll().splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}