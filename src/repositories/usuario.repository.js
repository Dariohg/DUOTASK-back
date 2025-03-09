import db from "../config/db.js";

export class UsuarioRepository {
    static getAll() {
        return db.data.usuarios;
    }

    static findById(id) {
        return db.data.usuarios.find(usuario => usuario.id === id);
    }

    static findByUsername(username) {
        return db.data.usuarios.find(usuario => usuario.username === username);
    }

    static findByEmail(email) {
        return db.data.usuarios.find(usuario => usuario.correoElectronico === email);
    }

    static save(usuario) {
        db.data.usuarios.push(usuario);
        db.write();
        return usuario;
    }

    static update(id, newData) {
        const usuario = this.findById(id);
        if (usuario) {
            Object.assign(usuario, newData);
            db.write();
            return usuario;
        }
        return null;
    }

    static delete(id) {
        const index = db.data.usuarios.findIndex(usuario => usuario.id === id);
        if (index !== -1) {
            db.data.usuarios.splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}