import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// Datos iniciales de la base de datos
const defaultData = {
    usuarios: [],
    alumnos: [],
    grupos: [],
    asistencias: [], 
    camposFormativos: [
        { id: "1", nombre: "Lenguajes", color: "Rojo" },
        { id: "2", nombre: "Saberes y pensamientos científico", color: "Azul" },
        { id: "3", nombre: "Ética, Naturaleza y sociedades", color: "Verde" },
        { id: "4", nombre: "De lo humano a lo comunitario", color: "Morado" }
    ],
    camposEvaluativos: [
        { id: "1", nombre: "Tareas" },
        { id: "2", nombre: "Lecturas" },
        { id: "3", nombre: "Escritura" },
        { id: "4", nombre: "Tablas de multiplicar" },
        { id: "5", nombre: "Participaciones" }
    ],
    actividades: [],
    calificaciones: []
};

// Crear un adaptador de base de datos
const adapter = new JSONFileSync('db.json');
const db = new LowSync(adapter, defaultData);

// Leer los datos desde db.json
db.read();

// Si no hay datos, establecer los datos predeterminados
if (!db.data || Object.keys(db.data).length === 0) {
    db.data = defaultData;
    db.write();
}

export default db;