import { CalificacionRepository } from "../repositories/calificacion.repository.js";
import { AlumnoRepository } from "../repositories/alumno.repository.js";
import { ActividadRepository } from "../repositories/actividad.repository.js";
import { CampoEvaluativoRepository } from "../repositories/campoEvaluativo.repository.js";
import { CampoFormativoRepository } from "../repositories/campoFormativo.repository.js";
import { GrupoRepository } from "../repositories/grupo.repository.js";
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

    static async createCalificacion(idActividad, idAlumno, valor) {
        // Validar que la actividad existe
        const actividad = ActividadRepository.findById(idActividad);
        if (!actividad) {
            throw new Error("Actividad no encontrada");
        }

        // Validar que el alumno existe
        const alumno = AlumnoRepository.findById(idAlumno);
        if (!alumno) {
            throw new Error("Alumno no encontrado");
        }

        // Validar que la calificación es un número válido entre 0 y 10
        const calificacion = parseFloat(valor);
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe ser un número entre 0 y 10");
        }

        // Verificar si ya existe una calificación para este alumno y actividad
        const calificacionExistente = CalificacionRepository.findByAlumnoYActividad(idAlumno, idActividad);
        if (calificacionExistente) {
            // Actualizar la calificación existente
            calificacionExistente.calificacion = calificacion;
            return CalificacionRepository.update(calificacionExistente.id, calificacionExistente);
        }

        // Crear nueva calificación
        const newCalificacion = new Calificacion(
            uuidv4(),
            idActividad,
            idAlumno,
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

    static async getCalificacionesCompletasPorActividad(idActividad) {
        const actividad = ActividadRepository.findById(idActividad);
        if (!actividad) {
            throw new Error("Actividad no encontrada");
        }

        const calificaciones = CalificacionRepository.findByActividad(idActividad);
        const alumnos = AlumnoRepository.getAll();

        // Añadir información completa a cada calificación
        return calificaciones.map(calificacion => {
            const alumno = alumnos.find(a => a.id === calificacion.idAlumno);

            return {
                id: calificacion.id,
                alumno: alumno ? {
                    id: alumno.id,
                    nombre: alumno.nombre,
                    apellido: alumno.apellido
                } : null,
                calificacion: calificacion.calificacion
            };
        });
    }

    static async getCalificacionesPorGrupoYCampos(idGrupo, idCampoEvaluativo, idCampoFormativo) {
        // Verificar que el grupo existe
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Obtener los alumnos del grupo
        const alumnos = AlumnoRepository.findByGrupo(idGrupo);

        // Obtener las actividades para este campo evaluativo y formativo
        const actividades = ActividadRepository.findByCampos(idCampoEvaluativo, idCampoFormativo);

        // Obtener información de los campos
        const campoEvaluativo = CampoEvaluativoRepository.findById(idCampoEvaluativo);
        const campoFormativo = CampoFormativoRepository.findById(idCampoFormativo);

        // Estructurar la respuesta
        const result = {
            campoEvaluativo: campoEvaluativo,
            campoFormativo: campoFormativo,
            actividades: actividades,
            alumnos: []
        };

        // Para cada alumno, obtener todas sus calificaciones para estas actividades
        for (const alumno of alumnos) {
            const alumnoData = {
                id: alumno.id,
                nombre: alumno.nombre,
                apellido: alumno.apellido,
                calificaciones: [],
                promedio: null
            };

            let sumaCalificaciones = 0;
            let contadorCalificaciones = 0;

            // Para cada actividad, buscar la calificación del alumno
            for (const actividad of actividades) {
                const calificacion = CalificacionRepository.findByAlumnoYActividad(alumno.id, actividad.id);
                const valor = calificacion ? calificacion.calificacion : null;

                alumnoData.calificaciones.push(valor);

                if (valor !== null) {
                    sumaCalificaciones += valor;
                    contadorCalificaciones++;
                }
            }

            // Calcular el promedio si hay calificaciones
            if (contadorCalificaciones > 0) {
                alumnoData.promedio = Number((sumaCalificaciones / contadorCalificaciones).toFixed(2));
            }

            result.alumnos.push(alumnoData);
        }

        return result;
    }

    static async getCalificacionesPorGrupoYCampoFormativo(idGrupo, idCampoFormativo) {
        // Verificar que el grupo existe
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Obtener los alumnos del grupo
        const alumnos = AlumnoRepository.findByGrupo(idGrupo);

        // Obtener todas las actividades para este campo formativo
        const actividades = ActividadRepository.getAll().filter(
            actividad => actividad.idCampoFormativo === idCampoFormativo
        );

        // Obtener información del campo formativo
        const campoFormativo = CampoFormativoRepository.findById(idCampoFormativo);
        if (!campoFormativo) {
            throw new Error("Campo formativo no encontrado");
        }

        // Obtener información de los campos evaluativos (pero no lo incluimos en la respuesta)
        const camposEvaluativos = CampoEvaluativoRepository.getAll();

        // Preparar el resultado
        const resultado = {
            campoFormativo: campoFormativo,
            // Eliminamos los camposEvaluativos de la respuesta
            alumnos: []
        };

        // Para cada alumno, obtener sus calificaciones para este campo formativo
        for (const alumno of alumnos) {
            const calificacionesAlumno = [];

            // Para cada actividad del campo formativo, buscar la calificación del alumno
            for (const actividad of actividades) {
                const calificacion = CalificacionRepository.findByAlumnoYActividad(alumno.id, actividad.id);

                if (calificacion) {
                    const campoEvaluativo = camposEvaluativos.find(
                        ce => ce.id === actividad.idCampoEvaluativo
                    );

                    calificacionesAlumno.push({
                        idCalificacion: calificacion.id,
                        actividad: actividad,
                        campoEvaluativo: campoEvaluativo,
                        calificacion: calificacion.calificacion
                    });
                }
            }

            // Añadir al resultado
            if (calificacionesAlumno.length > 0) {
                resultado.alumnos.push({
                    id: alumno.id,
                    nombre: alumno.nombre,
                    apellido: alumno.apellido,
                    calificaciones: calificacionesAlumno
                });
            }
        }

        return resultado;
    }

    static async getCalificacionesPorGrupoYCampoEvaluativo(idGrupo, idCampoEvaluativo) {
        // Verificar que el grupo existe
        const grupo = GrupoRepository.findById(idGrupo);
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        // Obtener los alumnos del grupo
        const alumnos = AlumnoRepository.findByGrupo(idGrupo);

        // Obtener todas las actividades para este campo evaluativo
        const actividades = ActividadRepository.getAll().filter(
            actividad => actividad.idCampoEvaluativo === idCampoEvaluativo
        );

        // Obtener información del campo evaluativo
        const campoEvaluativo = CampoEvaluativoRepository.findById(idCampoEvaluativo);
        if (!campoEvaluativo) {
            throw new Error("Campo evaluativo no encontrado");
        }

        // Obtener información de los campos formativos (pero no lo incluimos en la respuesta)
        const camposFormativos = CampoFormativoRepository.getAll();

        // Preparar el resultado
        const resultado = {
            campoEvaluativo: campoEvaluativo,
            // Eliminamos camposFormativos de la respuesta
            alumnos: []
        };

        // Para cada alumno, obtener sus calificaciones para este campo evaluativo
        for (const alumno of alumnos) {
            const calificacionesAlumno = [];

            // Para cada actividad del campo evaluativo, buscar la calificación del alumno
            for (const actividad of actividades) {
                const calificacion = CalificacionRepository.findByAlumnoYActividad(alumno.id, actividad.id);

                if (calificacion) {
                    const campoFormativo = camposFormativos.find(
                        cf => cf.id === actividad.idCampoFormativo
                    );

                    calificacionesAlumno.push({
                        idCalificacion: calificacion.id,
                        actividad: actividad,
                        campoFormativo: campoFormativo,
                        calificacion: calificacion.calificacion
                    });
                }
            }

            // Añadir al resultado
            if (calificacionesAlumno.length > 0) {
                resultado.alumnos.push({
                    id: alumno.id,
                    nombre: alumno.nombre,
                    apellido: alumno.apellido,
                    calificaciones: calificacionesAlumno
                });
            }
        }

        return resultado;
    }
}