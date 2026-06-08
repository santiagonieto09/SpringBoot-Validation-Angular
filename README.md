# Gestión de Clientes — Validación y Manejo Global de Excepciones

Aplicación full-stack CRUD para la gestión de clientes, diseñada como ejemplo didáctico de **validación de datos** y **manejo centralizado de excepciones** mediante `@ControllerAdvice` en Spring Boot, con un frontend en Angular 17.

---

## Stack Tecnológico

### Backend
| Tecnología | Versión |
|---|---|
| Java | 8 |
| Spring Boot | 2.7.6 |
| Spring Data JPA / Hibernate | — |
| Hibernate Validator | 6.0.13.Final |
| MySQL | — |
| ModelMapper | 3.0.0 |
| Lombok | — |

### Frontend
| Tecnología | Versión |
|---|---|
| Angular | 17.2.0 |
| TypeScript | ~5.3.2 |
| Bootstrap | 5.3.0 |
| SweetAlert2 | 11.6.13 |
| RxJS | ~7.8.0 |

---

## Funcionalidades

- **CRUD completo** de clientes (Crear, Listar, Actualizar, Eliminar)
- **Validación en dos capas**: frontend (Angular reactive forms) y backend (Bean Validation)
- **Manejo global de excepciones** vía `@ControllerAdvice` con códigos de error estandarizados
- **Mensajes de validación internacionalizados** (español)
- **Notificaciones al usuario** con SweetAlert2 (éxito, error, confirmación de eliminación)
- **Arquitectura REST** con CORS habilitado

---

## Validaciones Implementadas

### Backend (Spring Boot)

| Anotación | Campo | Mensaje |
|---|---|---|
| `@NotNull` + `@Size(min=5, max=45)` | nombre | Validación de longitud |
| `@NotNull` + `@Size(min=5, max=45)` | apellido | "El apellido debe estar entre 5 y 45" |
| `@NotNull` + `@Email` | email | "Correo no valido" |
| `@PastOrPresent` | createAt | "La fecha no puede estar en el futuro" |
| `@Min(1)` | id (path variable) | — |

### Excepciones Capturadas por `@ControllerAdvice`

| Excepción | Código HTTP | Código de Error |
|---|---|---|
| `MethodArgumentNotValidException` | 400 Bad Request | Map campo → mensaje |
| `ConstraintViolationException` | 400 Bad Request | Mensaje directo |
| `ReglaNegocioExcepcion` | 400 Bad Request | GC-0004 |
| `EntidadNoExisteException` | 404 Not Found | GC-0003 |
| `EntidadYaExisteException` | 406 Not Acceptable | GC-0002 |
| `Exception` (genérica) | 500 Internal Server Error | GC-0001 |

### Frontend (Angular)

- Validación reactiva con `Validators.required` en formulario de creación
- Visualización de errores del backend por campo
- Confirmación con SweetAlert2 antes de eliminar

---

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/clientes` | Listar todos los clientes |
| `GET` | `/api/clientes/{id}` | Obtener cliente por ID |
| `POST` | `/api/clientes` | Crear un nuevo cliente |
| `PUT` | `/api/clientes/{id}` | Actualizar un cliente existente |
| `DELETE` | `/api/clientes/{id}` | Eliminar un cliente |

---

## Requisitos Previos

- **Java 8** o superior
- **Maven** 3.x
- **MySQL** corriendo en `localhost:3306`
- **Node.js** 18+ y **npm**
- **Angular CLI** 17.x

---

## Configuración y Ejecución

### 1. Base de datos

```sql
CREATE DATABASE bdClientes;
```

### 2. Backend (Spring Boot)

```bash
cd "ejemplo validaciones v 3.0 con ControllerAdvice"
mvn spring-boot:run
```

El servidor inicia en `http://localhost:5000`.

### 3. Frontend (Angular)

```bash
cd "proyecto angular plantilla"
npm install
ng serve
```

La aplicación se sirve en `http://localhost:4200`.

> El frontend está configurado para consumir la API en `http://localhost:5000/api/clientes`.

---

## Estructura del Proyecto

```
ejemplo validaciones v 3.0 con ControllerAdvice/
├── pom.xml
├── src/main/java/co/edu/unicauca/distribuidos/core/proyecto/
│   ├── ProyectoApplication.java
│   ├── configurations/         → MessageSource i18n
│   ├── controllers/            → ClienteRestController
│   ├── exceptionControllers/   → @ControllerAdvice + excepciones personalizadas
│   ├── models/                 → ClienteEntity (JPA)
│   ├── repositories/           → ClienteRepository
│   └── services/               → DTO, mappers, lógica de negocio
└── src/main/resources/
    ├── application.properties
    ├── ValidationMessages_es.properties
    └── import.sql
```

```
proyecto angular plantilla/
├── package.json
├── angular.json
├── server.ts                   → SSR con Express
└── src/app/
    ├── clientes/
    │   ├── crearClientes/      → Formulario reactivo de creación
    │   ├── actualizarClientes/ → Formulario de actualización
    │   ├── listarClientes/     → Tabla de listado
    │   └── servicios/          → ClienteService (HTTP)
    ├── excepciones/            → Modelo errorRetornado.ts
    ├── header/
    └── footer/
```

---

## Licencia

Proyecto académico — Universidad del Cauca.
