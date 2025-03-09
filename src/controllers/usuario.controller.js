import { UsuarioService } from "../services/usuario.service.js";

export class UsuarioController {
    static async register(req, res) {
        try {
            const { nombre, apellido, username, password, correoElectronico, numeroTelefono } = req.body;
            const usuario = await UsuarioService.register(
                nombre,
                apellido,
                username,
                password,
                correoElectronico,
                numeroTelefono
            );

            // Eliminar la contraseña de la respuesta
            const usuarioSinPassword = { ...usuario };
            delete usuarioSinPassword.password;

            res.status(201).json({
                message: "Usuario registrado con éxito",
                usuario: usuarioSinPassword
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, usuario } = await UsuarioService.login(username, password);

            // Eliminar la contraseña de la respuesta
            const usuarioSinPassword = { ...usuario };
            delete usuarioSinPassword.password;

            res.status(200).json({
                message: "Inicio de sesión exitoso",
                token,
                usuario: usuarioSinPassword
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async validateUsername(req, res) {
        try {
            const { username } = req.params;
            const exists = await UsuarioService.usernameExists(username);
            res.json({ exists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}