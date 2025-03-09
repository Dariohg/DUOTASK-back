# Sistema de Calificaciones - API

API para gestionar calificaciones escolares basadas en campos formativos y evaluativos.

## Estructura de la base de datos

* **Usuarios**: Administradores del sistema
* **Alumnos**: Estudiantes a los que se les asignan calificaciones
* **Campos Formativos** (datos fijos):
   1. Lenguajes (Rojo)
   2. Saberes y pensamientos científico (Azul)
   3. Ética, Naturaleza y sociedades (Verde)
   4. De lo humano a lo comunitario (Morado)
* **Campos Evaluativos** (datos fijos):
   1. Tareas
   2. Lecturas
   3. Escritura
   4. Tablas de multiplicar
   5. Participaciones
* **Calificaciones**: Relaciona alumnos con campos formativos y evaluativos

## Tecnologías utilizadas

* Node.js
* Express
* JWT para autenticación
* LowDB (base de datos embebida basada en JSON)
* UUID para generación de IDs únicos
* bcryptjs para cifrado de contraseñas

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con:

```
PORT=3000
JWT_SECRET=tu_clave_secreta_para_jwt
```

4. Iniciar el servidor:

```
npm run dev
```

## Rutas de API

### Usuarios
* **POST /api/usuarios/register**: Registrar nuevo usuario
* **POST /api/usuarios/login**: Iniciar sesión
* **GET /api/usuarios/validate/:username**: Verificar si un nombre de usuario está disponible

### Alumnos
* **GET /api/alumnos**: Obtener todos los alumnos
* **GET /api/alumnos/:id**: Obtener un alumno por ID
* **POST /api/alumnos**: Crear un nuevo alumno
* **PUT /api/alumnos/:id**: Actualizar un alumno
* **DELETE /api/alumnos/:id**: Eliminar un alumno

### Campos Formativos
* **GET /api/campos-formativos**: Obtener todos los campos formativos
* **GET /api/campos-formativos/:id**: Obtener un campo formativo por ID

### Campos Evaluativos
* **GET /api/campos-evaluativos**: Obtener todos los campos evaluativos
* **GET /api/campos-evaluativos/:id**: Obtener un campo evaluativo por ID

### Calificaciones
* **GET /api/calificaciones**: Obtener todas las calificaciones
* **GET /api/calificaciones/completas**: Obtener calificaciones con información detallada
* **GET /api/calificaciones/:id**: Obtener una calificación por ID
* **GET /api/calificaciones/alumno/:idAlumno**: Obtener calificaciones por alumno
* **POST /api/calificaciones**: Crear una nueva calificación
* **PUT /api/calificaciones/:id**: Actualizar una calificación
* **DELETE /api/calificaciones/:id**: Eliminar una calificación

## Ejemplos de uso

### Registrar un usuario

```
POST /api/usuarios/register
Content-Type: application/json

{
  "nombre": "Admin",
  "apellido": "Sistema",
  "username": "admin",
  "password": "123456",
  "correoElectronico": "admin@sistema.com",
  "numeroTelefono": "1234567890"
}
```

### Iniciar sesión

```
POST /api/usuarios/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

### Crear un alumno

```
POST /api/alumnos
Content-Type: application/json
Authorization: Bearer [token]

{
  "nombre": "Juan",
  "apellido": "Pérez"
}
```

### Registrar una calificación

```
POST /api/calificaciones
Content-Type: application/json
Authorization: Bearer [token]

{
  "idAlumno": "id-del-alumno",
  "idCampoEvaluativo": "1", 
  "idCampoFormativo": "2",
  "calificacion": 8.5
}
```
