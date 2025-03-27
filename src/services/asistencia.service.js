import { AsistenciaRepository } from "../repositories/asistencia.repository.js";
import { Asistencia } from "../models/asistencia.model.js";
import { v4 as uuidv4 } from "uuid";

export class AsistenciaService {
    static async getAsistenciasPorGrupo(idGrupo) {
        return AsistenciaRepository.findByGrupo(idGrupo);
    }

    static async getAsistenciasPorAlumno(idAlumno) {
        return AsistenciaRepository.findByAlumno(idAlumno);
    }

    static async getAsistenciasPorPeriodo(idAlumno, inicio, fin) {
        return AsistenciaRepository.findByPeriodo(idAlumno, inicio, fin);
    }

    static async createAsistencias(idGrupo, asistencias) {
        const nuevasAsistencias = asistencias.map(({ idAlumno, asistencia }) => new Asistencia(uuidv4(), idGrupo, idAlumno, asistencia, new Date().toISOString()));
        return AsistenciaRepository.save(nuevasAsistencias);
    }

    static async updateAsistencia(id, idAlumno, asistencia) {
        return AsistenciaRepository.update(id, idAlumno, asistencia);
    }

    static async deleteAsistencia(id) {
        return AsistenciaRepository.delete(id);
    }
}
