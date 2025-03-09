export class Calificacion {
    constructor(id, idAlumno, idCampoEvaluativo, idCampoFormativo, calificacion) {
        this.id = id;
        this.idAlumno = idAlumno;
        this.idCampoEvaluativo = idCampoEvaluativo;
        this.idCampoFormativo = idCampoFormativo;
        this.calificacion = calificacion;
    }
}