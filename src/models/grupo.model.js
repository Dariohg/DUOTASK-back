export class Grupo {
    constructor(id, nombre, grado, descripcion) {
        this.id = id;
        this.nombre = nombre; // Ej: "1A", "2B", etc.
        this.grado = grado;   // Ej: 1, 2, 3, etc.
        this.descripcion = descripcion;
        this.alumnos = [];    // Array de IDs de alumnos
    }
}