import { CalificacionRepository } from "../repositories/calificacion.repository.js";
import { AlumnoRepository } from "../repositories/alumno.repository.js";
import { CampoFormativoRepository } from "../repositories/campoFormativo.repository.js";
import { CampoEvaluativoRepository } from "../repositories/campoEvaluativo.repository.js";
import { Calificacion } from "../models/calificacion.model.js";
import { v4 as uuidv4 } from "uuid";

export class CalificacionService {
    static async getAllCalificaciones() {
        return CalificacionRepository.getAll();
    }

    static async getCalificacionById(id) {
        const calificacion = CalificacionRepository.findById(id);
        if (!calificacion) {
            throw new Error("Calificación no encontrada");
        }
        return calificacion;
    }

    static async getCalificacionesByAlumno(idAlumno) {
        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }
        return CalificacionRepository.findByAlumno(idAlumno);
    }

    static async createCalificacion(idAlumno, idCampoEvaluativo, idCampoFormativo, valor) {
        // Validar que el alumno existe
        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        // Validar que el campo evaluativo existe
        const campoEvaluativo = CampoEvaluativoRepository.findById(idCampoEvaluativo);
        if (!campoEvaluativo) {
            throw new Error("Campo evaluativo no encontrado");
        }

        // Validar que el campo formativo existe
        const campoFormativo = CampoFormativoRepository.findById(idCampoFormativo);
        if (!campoFormativo) {
            throw new Error("Campo formativo no encontrado");
        }

        // Validar que la calificación es un número válido entre 0 y 10
        const calificacion = parseFloat(valor);
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe ser un número entre 0 y 10");
        }

        // Verificar si ya existe una calificación para este alumno, campo evaluativo y campo formativo
        const existingCalificaciones = CalificacionRepository.findByAlumno(idAlumno);
        const duplicada = existingCalificaciones.find(
            c => c.idCampoEvaluativo === idCampoEvaluativo && c.idCampoFormativo === idCampoFormativo
        );

        if (duplicada) {
            // Si ya existe, actualizar en lugar de crear una nueva
            duplicada.calificacion = calificacion;
            return CalificacionRepository.update(duplicada.id, duplicada);
        }

        // Crear nueva calificación
        const newCalificacion = new Calificacion(
            uuidv4(),
            idAlumno,
            idCampoEvaluativo,
            idCampoFormativo,
            calificacion
        );

        return CalificacionRepository.save(newCalificacion);
    }

    static async updateCalificacion(id, valor) {
        const calificacion = CalificacionRepository.findById(id);
        if (!calificacion) {
            throw new Error("Calificación no encontrada");
        }

        // Validar que la calificación es un número válido entre 0 y 10
        const nuevoValor = parseFloat(valor);
        if (isNaN(nuevoValor) || nuevoValor < 0 || nuevoValor > 10) {
            throw new Error("La calificación debe ser un número entre 0 y 10");
        }

        calificacion.calificacion = nuevoValor;
        return CalificacionRepository.update(id, calificacion);
    }

    static async deleteCalificacion(id) {
        const calificacion = CalificacionRepository.findById(id);
        if (!calificacion) {
            throw new Error("Calificación no encontrada");
        }
        return CalificacionRepository.delete(id);
    }

    static async getCalificacionesCompletas() {
        const calificaciones = CalificacionRepository.getAll();
        const alumnos = AlumnoRepository.getAll();
        const camposFormativos = CampoFormativoRepository.getAll();
        const camposEvaluativos = CampoEvaluativoRepository.getAll();

        // Añadir información completa a cada calificación
        return calificaciones.map(calificacion => {
            const alumno = alumnos.find(a => a.id === calificacion.idAlumno);
            const campoFormativo = camposFormativos.find(c => c.id === calificacion.idCampoFormativo);
            const campoEvaluativo = camposEvaluativos.find(c => c.id === calificacion.idCampoEvaluativo);

            return {
                ...calificacion,
                alumno: alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido',
                campoFormativo: campoFormativo ? campoFormativo.nombre : 'Desconocido',
                campoEvaluativo: campoEvaluativo ? campoEvaluativo.nombre : 'Desconocido'
            };
        });
    }
}