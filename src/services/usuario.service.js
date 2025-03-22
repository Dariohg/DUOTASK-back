import { UsuarioRepository } from "../repositories/usuario.repository.js";
import { Usuario } from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class UsuarioService {
    static async register(nombre, apellido, username, password, correoElectronico, numeroTelefono) {
        // Validaciones básicas
        if (!nombre || !apellido || !username || !password || !correoElectronico) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoElectronico)) {
            throw new Error("El correo electrónico no tiene un formato válido.");
        }

        // Verificar si el usuario o email ya existen
        if (UsuarioRepository.findByUsername(username)) {
            throw new Error("El nombre de usuario ya está en uso.");
        }

        if (UsuarioRepository.findByEmail(correoElectronico)) {
            throw new Error("El correo electrónico ya está registrado.");
        }

        // Crear el usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUsuario = new Usuario(
            uuidv4(),
            nombre,
            apellido,
            username,
            hashedPassword,
            correoElectronico,
            numeroTelefono
        );

        return UsuarioRepository.save(newUsuario);
    }

    static async login(username, password) {
        const usuario = UsuarioRepository.findByUsername(username);
        if (!usuario) throw new Error("Usuario no encontrado.");

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) throw new Error("Contraseña incorrecta.");

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET || "secret_key_default",
            { expiresIn: "8h" }
        );

        return { token, usuario };
    }

    static async usernameExists(username) {
        const usuario = UsuarioRepository.findByUsername(username);
        return !!usuario;
    }
}