import { CampoFormativoRepository } from "../repositories/campoFormativo.repository.js";

export class CampoFormativoService {
    static async getAllCamposFormativos() {
        return CampoFormativoRepository.getAll();
    }

    static async getCampoFormativoById(id) {
        const campo = CampoFormativoRepository.findById(id);
        if (!campo) {
            throw new Error("Campo formativo no encontrado");
        }
        return campo;
    }
}