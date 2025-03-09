import db from "../config/db.js";

export class CampoFormativoRepository {
    static getAll() {
        return db.data.camposFormativos;
    }

    static findById(id) {
        return db.data.camposFormativos.find(campo => campo.id === id);
    }

    // No implementamos save, update y delete porque son datos fijos
}