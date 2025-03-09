import { CampoEvaluativoRepository } from "../repositories/campoEvaluativo.repository.js";

export class CampoEvaluativoService {
    static async getAllCamposEvaluativos() {
        return CampoEvaluativoRepository.getAll();
    }

    static async getCampoEvaluativoById(id) {
        const campo = CampoEvaluativoRepository.findById(id);
        if (!campo) {
            throw new Error("Campo evaluativo no encontrado");
        }
        return campo;
    }
}
