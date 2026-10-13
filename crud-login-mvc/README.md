# Sistema de Gestión de Productos | CRUD + Login con MVC

## 1. Descripción del proyecto

Aplicación web desarrollada utilizando **Node.js, Sails.js y el patrón de arquitectura MVC (Modelo-Vista-Controlador)**.

El sistema permite gestionar un inventario de productos mediante las operaciones CRUD: crear, consultar, actualizar y eliminar registros.

Además, incorpora un sistema de autenticación mediante usuario y contraseña, almacenamiento seguro de contraseñas con bcrypt, manejo de sesiones y protección de rutas privadas.

La interfaz está desarrollada utilizando HTML5 semántico, EJS y Bootstrap 5.

Este proyecto fue realizado como parte de la **Tarea 3: Desarrollo de una aplicación CRUD y Login con MVC**.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicación web utilizando el patrón MVC que permita gestionar productos y autenticar usuarios, garantizando que las funcionalidades privadas sean accesibles únicamente mediante una sesión válida.

### Objetivos específicos

- Implementar las cuatro operaciones CRUD sobre productos.
- Aplicar el patrón MVC utilizando Sails.js.
- Desarrollar un sistema de registro e inicio de sesión.
- Proteger las contraseñas mediante hashing con bcrypt.
- Implementar sesiones para gestionar la autenticación.
- Restringir el acceso a rutas privadas mediante Policies.
- Incorporar protección CSRF en solicitudes que modifican información.
- Construir interfaces utilizando HTML5 semántico, EJS y Bootstrap.
- Verificar el funcionamiento mediante pruebas funcionales.

## 3. Tecnologías utilizadas

| Tecnología | Descripción |
|---|---|
| Node.js | Entorno de ejecución de JavaScript |
| Sails.js | Framework backend basado en MVC |
| JavaScript | Lenguaje de programación |
| EJS | Motor de plantillas para las vistas |
| HTML5 | Estructura semántica de las páginas |
| Bootstrap 5 | Diseño responsive de la interfaz |
| Waterline ORM | Acceso y manipulación de datos |
| sails-disk | Persistencia local durante el desarrollo |
| bcrypt | Hash seguro de contraseñas |
| Git y GitHub | Control de versiones y repositorio |
| Postman | Pruebas de endpoints HTTP |

## 4. Arquitectura MVC

El proyecto utiliza el patrón Modelo-Vista-Controlador, que separa la aplicación en tres componentes.

### Modelo (Model)

Define la estructura de los datos y permite realizar operaciones mediante Waterline ORM.

**Producto.js**

Contiene los atributos:

- `nombre`: nombre del producto.
- `precio`: precio del producto.
- `cantidad`: unidades disponibles.
- `descripcion`: información adicional.

**Usuario.js**

Contiene los atributos:

- `username`: nombre de usuario único.
- `password`: hash de la contraseña del usuario.

### Vista (View)

Permite visualizar e interactuar con la información.

Las vistas se desarrollaron con EJS, HTML5 semántico y Bootstrap.

- `login.ejs`: formulario de inicio de sesión.
- `panel.ejs`: interfaz para administrar productos.

### Controlador (Controller)

Procesa las peticiones HTTP, ejecuta la lógica y comunica los modelos con las vistas.

- `ProductoController.js`: operaciones CRUD.
- `AuthController.js`: registro, Login y Logout.
- `PanelController.js`: consulta y presentación de productos.

### Flujo MVC

1. El usuario realiza una acción desde el navegador.
2. La aplicación recibe la petición mediante una ruta.
3. Las Policies verifican los permisos de acceso cuando corresponda.
4. El controlador procesa la petición.
5. El modelo realiza las operaciones sobre los datos.
6. El controlador devuelve una respuesta JSON o renderiza una vista EJS.

## 5. Estructura del proyecto

```text
crud-login-mvc/
├── api/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── PanelController.js
│   │   └── ProductoController.js
│   ├── models/
│   │   ├── Producto.js
│   │   └── Usuario.js
│   └── policies/
│       └── estaAutenticado.js
├── config/
│   ├── blueprints.js
│   ├── models.js
│   ├── policies.js
│   ├── routes.js
│   └── security.js
├── views/
│   ├── login.ejs
│   └── panel.ejs
├── package.json
└── README.md
```

Esta estructura presenta los archivos principales desarrollados para la tarea. Sails.js incluye otros archivos y directorios generados automáticamente.

## 6. Funcionalidades

### CRUD de productos

El sistema permite:

**CREATE:** Registrar nuevos productos con nombre, precio, cantidad y descripción.

**READ:** Consultar todos los productos registrados.

**UPDATE:** Modificar los datos de un producto existente mediante su identificador.

**DELETE:** Eliminar un producto, solicitando confirmación desde la interfaz.

### Autenticación

- Registro de usuarios.
- Inicio de sesión con usuario y contraseña.
- Verificación de contraseña utilizando bcrypt.
- Gestión de sesiones.
- Cierre de sesión.
- Restricción de acceso a recursos privados.

## 7. Instalación y ejecución

### Requisitos previos

- Node.js y npm instalados.
- Git instalado.
- Un navegador web.
- Visual Studio Code u otro editor compatible.

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Acceder a la carpeta:

```bash
cd crud-login-mvc
```

### Instalar dependencias

```bash
npm install
```

### Iniciar la aplicación

```bash
npx sails lift
```

La aplicación se ejecutará normalmente en:

`http://localhost:1337`

### Acceder al Login

`http://localhost:1337/login`

### Acceder al panel

`http://localhost:1337/panel`

El panel requiere una sesión autenticada.

**Nota:** La aplicación utiliza persistencia local para desarrollo. La configuración de migraciones y los secretos de sesión deben adaptarse antes de utilizar el proyecto en producción.

## 8. Endpoints de la aplicación

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/registro` | Registrar usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/logout` | Cerrar sesión |

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/productos` | Consultar productos |
| POST | `/productos` | Crear producto |
| PUT | `/productos/:id` | Actualizar producto |
| DELETE | `/productos/:id` | Eliminar producto |

### Vistas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/login` | Mostrar formulario de Login |
| GET | `/panel` | Mostrar panel protegido |

### Ejemplo de creación de producto

**POST `/productos`**

```json
{
  "nombre": "Laptop Lenovo",
  "precio": 850,
  "cantidad": 5,
  "descripcion": "Laptop para desarrollo"
}
```

Respuesta esperada: `201 Created`, incluyendo los datos y el identificador generado.

### Ejemplo de actualización

**PUT `/productos/1`**

```json
{
  "nombre": "Laptop Lenovo ThinkPad",
  "precio": 900,
  "cantidad": 3,
  "descripcion": "Producto actualizado"
}
```

El identificador debe corresponder a un producto existente.

## 9. Seguridad implementada

### Protección de contraseñas

Se utiliza bcrypt para generar hashes de contraseñas antes de almacenarlas.

Ejemplo conceptual:

```javascript
const passwordHash = await bcrypt.hash(password, 12);
```

Para verificar las credenciales:

```javascript
const passwordValida = await bcrypt.compare(
  password,
  usuario.password
);
```

Se utiliza bcrypt en lugar de MD5 porque está diseñado para almacenar contraseñas mediante hashes con un factor de coste configurable.

### Sesiones

Después del inicio de sesión, el servidor guarda el identificador del usuario en la sesión.

```javascript
req.session.usuarioId = usuario.id;
```

Al cerrar sesión, se invalida mediante:

```javascript
req.session.destroy();
```

### Protección de rutas mediante Policies

La Policy `estaAutenticado` verifica que la petición tenga una sesión válida antes de permitir el acceso al CRUD y al panel.

Si el usuario no está autenticado, el servidor debe responder con `401 Unauthorized`.

### Protección CSRF

Se configuró la protección CSRF para las peticiones que modifican información.

Las solicitudes POST, PUT y DELETE realizadas desde el navegador incluyen el token correspondiente mediante el encabezado `X-CSRF-Token`.

### Rutas automáticas

Se desactivaron las rutas blueprint automáticas que no son necesarias para el proyecto, utilizando rutas personalizadas para controlar el acceso.

## 10. Pruebas funcionales

Se realizaron pruebas del funcionamiento de la aplicación.

| Nº | Prueba | Resultado esperado |
|---|---|---|
| 1 | Login correcto | Acceso autorizado |
| 2 | Contraseña incorrecta | Error de autenticación |
| 3 | Crear producto | Producto registrado |
| 4 | Consultar productos | Listado disponible |
| 5 | Editar producto | Información actualizada |
| 6 | Eliminar producto | Registro eliminado |
| 7 | Cerrar sesión | Sesión invalidada |
| 8 | Acceder a `/panel` sin sesión | Acceso rechazado |
| 9 | Acceder a `/productos` sin sesión | Acceso rechazado |

### Verificación de rutas privadas

Se utilizó una ventana de incógnito para comprobar el acceso sin una sesión autenticada.

Al intentar acceder directamente a:

```text
http://localhost:1337/panel
http://localhost:1337/productos
```

El servidor devuelve un mensaje de acceso no autorizado, impidiendo consultar recursos privados.

## 11. Evidencias del funcionamiento

Incluir capturas de pantalla de:

- Pantalla de Login.
- Panel de administración.
- Registro de productos.
- Edición y eliminación.
- Acceso rechazado sin autenticación.

Las capturas pueden almacenarse en una carpeta `docs/screenshots/` del repositorio y vincularse desde esta sección.

## 12. Video demostrativo

**Plataforma:** Loom o YouTube.

**Duración máxima:** 3 minutos.

El video debe demostrar:

1. La pantalla de Login.
2. El inicio de sesión con credenciales correctas.
3. Las operaciones CRUD sobre productos.
4. El cierre de sesión.
5. El bloqueo de acceso a rutas privadas.
6. El uso de bcrypt para proteger las contraseñas.

**Enlace del video:** pendiente de agregar.

## 13. Conclusiones

El desarrollo del proyecto permitió aplicar el patrón MVC mediante Sails.js, separando la lógica de negocio, la estructura de datos y la presentación.

Se implementaron las operaciones CRUD utilizando Waterline ORM y un sistema de autenticación basado en sesiones.

También se incorporaron mecanismos de protección de contraseñas y restricción de acceso a rutas privadas.

La utilización de HTML5 semántico y Bootstrap permitió construir una interfaz organizada y adaptable.

El proyecto demuestra cómo integrar operaciones de gestión de información y autenticación dentro de una misma aplicación MVC.

## 14. Referencias

- [Sails.js - Documentación oficial](https://sailsjs.com/documentation)
- [Node.js - Documentación oficial](https://nodejs.org/en/docs)
- [EJS - Documentación](https://ejs.co/)
- [Bootstrap - Documentación oficial](https://getbootstrap.com/docs/5.3/)
- [bcrypt - npm](https://www.npmjs.com/package/bcrypt)
- [MDN - HTML semántico](https://developer.mozilla.org/es/docs/Glossary/Semantics)
- [Sails.js - Seguridad](https://sailsjs.com/documentation/concepts/security)

---

**Proyecto académico:** Tarea 3 - CRUD y Login con MVC

**Framework:** Sails.js

**Arquitectura:** Modelo-Vista-Controlador

**Asignatura:** Ingeniería Web
