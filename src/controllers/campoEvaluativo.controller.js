import { CampoEvaluativoService } from "../services/campoEvaluativo.service.js";

export class CampoEvaluativoController {
    static async getAll(req, res) {
        try {
            const campos = await CampoEvaluativoService.getAllCamposEvaluativos();
            res.json(campos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const campo = await CampoEvaluativoService.getCampoEvaluativoById(req.params.id);
            res.json(campo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}