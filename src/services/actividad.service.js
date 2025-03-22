import { ActividadRepository } from "../repositories/actividad.repository.js";
import { CampoEvaluativoRepository } from "../repositories/campoEvaluativo.repository.js";
import { CampoFormativoRepository } from "../repositories/campoFormativo.repository.js";
import { Actividad } from "../models/actividad.model.js";
import { v4 as uuidv4 } from "uuid";

export class ActividadService {
    static async getAllActividades() {
        return ActividadRepository.getAll();
    }

    static async getActividadById(id) {
        const actividad = ActividadRepository.findById(id);
        if (!actividad) {
            throw new Error("Actividad no encontrada");
        }
        return actividad;
    }

    static async getActividadesPorCampos(idCampoEvaluativo, idCampoFormativo) {
        // Verificar que los campos existen
        const campoEvaluativo = CampoEvaluativoRepository.findById(idCampoEvaluativo);
        if (!campoEvaluativo) {
            throw new Error("Campo evaluativo no encontrado");
        }

        const campoFormativo = CampoFormativoRepository.findById(idCampoFormativo);
        if (!campoFormativo) {
            throw new Error("Campo formativo no encontrado");
        }

        return ActividadRepository.findByCampos(idCampoEvaluativo, idCampoFormativo);
    }

    static async createActividad(idCampoEvaluativo, idCampoFormativo, nombre) {
        // Validaciones
        if (!idCampoEvaluativo || !idCampoFormativo || !nombre) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Verificar que los campos existen
        const campoEvaluativo = CampoEvaluativoRepository.findById(idCampoEvaluativo);
        if (!campoEvaluativo) {
            throw new Error("Campo evaluativo no encontrado");
        }

        const campoFormativo = CampoFormativoRepository.findById(idCampoFormativo);
        if (!campoFormativo) {
            throw new Error("Campo formativo no encontrado");
        }

        // Crear la actividad
        const newActividad = new Actividad(
            uuidv4(),
            idCampoEvaluativo,
            idCampoFormativo,
            nombre
        );

        return ActividadRepository.save(newActividad);
    }

    static async updateActividad(id, newData) {
        const actividad = ActividadRepository.findById(id);
        if (!actividad) {
            throw new Error("Actividad no encontrada");
        }
        return ActividadRepository.update(id, newData);
    }

    static async deleteActividad(id) {
        const actividad = ActividadRepository.findById(id);
        if (!actividad) {
            throw new Error("Actividad no encontrada");
        }
        return ActividadRepository.delete(id);
    }
}