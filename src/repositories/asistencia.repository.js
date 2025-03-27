import db from "../config/db.js";

export class AsistenciaRepository {
    static getAll() {
        if (!db.data.asistencias) {
            db.data.asistencias = [];
        }
        return db.data.asistencias;
    }

    static findByGrupo(idGrupo) {
        return this.getAll().filter(asistencia => asistencia.idGrupo === idGrupo);
    }

    static findByAlumno(idAlumno) {
        return this.getAll().filter(asistencia => asistencia.idAlumno === idAlumno);
    }

    static findByPeriodo(idAlumno, inicio, fin) {
        const fechaInicio = new Date(inicio).setUTCHours(0, 0, 0, 0); // 👈 Normaliza a medianoche UTC
        const fechaFin = new Date(fin).setUTCHours(23, 59, 59, 999); // 👈 Incluye todo el día
    
        return this.getAll().filter(asistencia => {
            const fechaAsistencia = new Date(asistencia.fecha).getTime();
            return asistencia.idAlumno === idAlumno && 
                   fechaAsistencia >= fechaInicio && 
                   fechaAsistencia <= fechaFin;
        });
    }

    static save(asistencias) {
        asistencias.forEach(asistencia => db.data.asistencias.push(asistencia));
        db.write();
        return asistencias;
    }

    static update(id, idAlumno, asistencia) {
        const registro = this.getAll().find(a => a.id === id && a.idAlumno === idAlumno);
        if (registro) {
            registro.asistencia = asistencia;
            db.write();
            return registro;
        }
        return null;
    }

    static delete(id) {
        const index = this.getAll().findIndex(a => a.id === id);
        if (index !== -1) {
            this.getAll().splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }
}