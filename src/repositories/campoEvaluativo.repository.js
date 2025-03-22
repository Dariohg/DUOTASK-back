import db from "../config/db.js";

export class CampoEvaluativoRepository {
    static getAll() {
        return db.data.camposEvaluativos;
    }

    static findById(id) {
        return db.data.camposEvaluativos.find(campo => campo.id === id);
    }

}