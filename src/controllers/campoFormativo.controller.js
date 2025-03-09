import { CampoFormativoService } from "../services/campoFormativo.service.js";

export class CampoFormativoController {
    static async getAll(req, res) {
        try {
            const campos = await CampoFormativoService.getAllCamposFormativos();
            res.json(campos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const campo = await CampoFormativoService.getCampoFormativoById(req.params.id);
            res.json(campo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}