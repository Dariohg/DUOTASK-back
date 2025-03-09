export class Alumno {
    constructor(id, nombre, apellido, idGrupo = null) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.idGrupo = idGrupo;  // Referencia al grupo al que pertenece
    }
}