# Sistema de Gestión de Productos | CRUD + Login con MVC

**Sitio desplegado:** https://crud-login-2ood.onrender.com/

## 1. Descripción del proyecto

Aplicación web desarrollada con **Node.js, Sails.js y el patrón de arquitectura MVC (Modelo-Vista-Controlador)**.

El sistema permite gestionar un inventario de productos mediante las operaciones CRUD: crear, consultar, actualizar y eliminar registros.

Incorpora autenticación con usuario y contraseña, almacenamiento seguro de contraseñas con bcrypt, manejo de sesiones y protección de rutas privadas. La interfaz usa HTML5 semántico, EJS y Bootstrap 5.

La aplicación está desplegada en **Render** y guarda sus datos en una base **PostgreSQL alojada en Neon**.

Proyecto realizado como parte de la **Tarea 3: Desarrollo de una aplicación CRUD y Login con MVC**.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicación web con el patrón MVC que permita gestionar productos y autenticar usuarios, garantizando que las funcionalidades privadas solo sean accesibles mediante una sesión válida.

### Objetivos específicos

- Implementar las cuatro operaciones CRUD sobre productos.
- Aplicar el patrón MVC con Sails.js.
- Desarrollar un sistema de registro e inicio de sesión.
- Proteger las contraseñas mediante hashing con bcrypt.
- Implementar sesiones para gestionar la autenticación.
- Restringir el acceso a rutas privadas mediante Policies.
- Incorporar protección CSRF en las solicitudes que modifican información.
- Construir interfaces con HTML5 semántico, EJS y Bootstrap.
- Desplegar la aplicación en un servicio en la nube con una base de datos persistente.
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
| sails-disk | Persistencia local en desarrollo |
| PostgreSQL + sails-postgresql | Base de datos en producción |
| Neon | Servicio que aloja la base PostgreSQL |
| Render | Plataforma donde se despliega la aplicación |
| bcrypt | Hash seguro de contraseñas |
| Git y GitHub | Control de versiones y repositorio |
| Postman | Pruebas de endpoints HTTP |

## 4. Arquitectura MVC

El proyecto separa la aplicación en tres componentes.

### Modelo (Model)

Define la estructura de los datos y permite operar sobre ellos mediante Waterline ORM.

**Producto.js**

- `nombre`: nombre del producto.
- `precio`: precio del producto.
- `cantidad`: unidades disponibles.
- `descripcion`: información adicional.

**Usuario.js**

- `username`: nombre de usuario único.
- `password`: hash de la contraseña del usuario.

### Vista (View)

Permite visualizar e interactuar con la información. Se desarrollaron con EJS, HTML5 semántico y Bootstrap.

- `login.ejs`: formulario de inicio de sesión.
- `panel.ejs`: interfaz para administrar productos.

### Controlador (Controller)

Procesa las peticiones HTTP, ejecuta la lógica y comunica los modelos con las vistas.

- `ProductoController.js`: operaciones CRUD.
- `AuthController.js`: registro, login y logout.
- `PanelController.js`: consulta y presentación de productos.

### Flujo MVC

1. El usuario realiza una acción desde el navegador.
2. La aplicación recibe la petición mediante una ruta.
3. Las Policies verifican los permisos de acceso cuando corresponde.
4. El controlador procesa la petición.
5. El modelo realiza las operaciones sobre los datos.
6. El controlador devuelve una respuesta JSON o renderiza una vista EJS.

## 5. Estructura del proyecto

```text
Crud-Login/
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
│   ├── env/
│   │   └── production.js
│   ├── blueprints.js
│   ├── datastores.js
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

Se muestran los archivos principales desarrollados para la tarea. Sails.js incluye otros archivos y directorios generados automáticamente.

## 6. Funcionalidades

### CRUD de productos

- **CREATE:** registrar productos con nombre, precio, cantidad y descripción.
- **READ:** consultar todos los productos registrados.
- **UPDATE:** modificar un producto existente mediante su identificador.
- **DELETE:** eliminar un producto, con confirmación desde la interfaz.

### Autenticación

- Registro de usuarios.
- Inicio de sesión con usuario y contraseña.
- Verificación de contraseña con bcrypt.
- Gestión de sesiones.
- Cierre de sesión.
- Restricción de acceso a recursos privados.

## 7. Instalación y ejecución local

### Requisitos previos

- Node.js 24 y npm instalados.
- Git instalado.
- Un navegador web.
- Visual Studio Code u otro editor compatible.

### Clonar el repositorio

```bash
git clone https://github.com/Mateocorone/Crud-Login.git
cd Crud-Login
```

### Instalar dependencias

```bash
npm install
```

### Iniciar la aplicación

```bash
npx sails lift
```

En desarrollo la aplicación usa `sails-disk`, por lo que no necesita configurar una base de datos. Se ejecuta en:

- Login: `http://localhost:1337/login`
- Panel (requiere sesión): `http://localhost:1337/panel`

La aplicación no incluye usuarios predefinidos: crea el primero mediante `POST /auth/registro`. La contraseña debe tener al menos 8 caracteres.

## 8. Despliegue en producción

La aplicación se despliega en **Render** (servicio web con Node) y usa **PostgreSQL en Neon**.

### Configuración en Render

| Campo | Valor |
|---|---|
| Branch | `main` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

### Variables de entorno

Los valores se configuran en el panel de Render y **no se guardan en el repositorio**.

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión de Neon (con `sslmode=require`) |
| `sails_port` | Puerto en el que escucha la aplicación (`10000` en Render) |
| `sails_session__secret` | Secreto aleatorio para firmar las cookies de sesión |
| `NODE_VERSION` | Versión de Node (`24`) |

### Creación de las tablas

Sails no permite `migrate: 'alter'` en producción, por lo que la configuración usa `migrate: 'safe'`. Las tablas `usuario` y `producto` se crearon una sola vez ejecutando la aplicación en un entorno de desarrollo local conectado a la base de Neon, con la estrategia `alter`.

### Configuración de sockets

En producción Sails exige declarar los orígenes permitidos para sockets. Se configuró `sockets.onlyAllowOrigins` con la URL pública de la aplicación en `config/env/production.js`.

### Aviso sobre el plan gratuito

En el plan gratuito de Render el servicio se suspende tras un período de inactividad. La primera petición después de ese tiempo puede tardar unos segundos en responder.

## 9. Endpoints de la aplicación

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

### Vistas y seguridad

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/login` | Mostrar formulario de login |
| GET | `/panel` | Mostrar panel protegido |
| GET | `/csrfToken` | Obtener el token CSRF |

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

Respuesta esperada: `201 Created`, con los datos y el identificador generado.

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

## 10. Seguridad implementada

### Protección de contraseñas

Se usa bcrypt para generar el hash antes de almacenar la contraseña:

```javascript
const passwordHash = await bcrypt.hash(password, 12);
```

Para verificar las credenciales:

```javascript
const passwordValida = await bcrypt.compare(password, usuario.password);
```

Se usa bcrypt en lugar de MD5 porque está diseñado para almacenar contraseñas y permite configurar un factor de coste.

### Sesiones

Tras el inicio de sesión, el servidor guarda el identificador del usuario en la sesión:

```javascript
req.session.usuarioId = usuario.id;
```

Al cerrar sesión se invalida con `req.session.destroy()`.

### Protección de rutas mediante Policies

La Policy `estaAutenticado` verifica que la petición tenga una sesión válida antes de permitir el acceso al CRUD y al panel. Si el usuario no está autenticado, el servidor responde con `401 Unauthorized`.

### Protección CSRF

Se configuró la protección CSRF para las peticiones que modifican información. Las solicitudes POST, PUT y DELETE realizadas desde el navegador incluyen el token mediante el encabezado `X-CSRF-Token`.

### Gestión de secretos

Las credenciales de la base de datos y el secreto de sesión se leen desde variables de entorno y no forman parte del repositorio. El archivo `.gitignore` excluye `.env` y `config/local.js`.

### Rutas automáticas

Se desactivaron las rutas blueprint automáticas que no son necesarias, y se usan rutas personalizadas para controlar el acceso.

## 11. Pruebas funcionales

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

Se usó una ventana de incógnito para comprobar el acceso sin sesión. Al intentar entrar directamente a:

```text
https://crud-login-2ood.onrender.com/panel
https://crud-login-2ood.onrender.com/productos
```

el servidor devuelve un mensaje de acceso no autorizado.

## 12. Conclusiones

El desarrollo del proyecto permitió aplicar el patrón MVC con Sails.js, separando la lógica de negocio, la estructura de datos y la presentación.

Se implementaron las operaciones CRUD con Waterline ORM y un sistema de autenticación basado en sesiones, junto con mecanismos de protección de contraseñas y restricción de rutas privadas.

El despliegue en Render con PostgreSQL en Neon permitió pasar de una persistencia local a una base de datos accesible en línea, y obligó a adaptar la configuración de producción: variables de entorno, sockets, SSL y migraciones.

## 15. Referencias

- [Sails.js - Documentación oficial](https://sailsjs.com/documentation)
- [Sails.js - Despliegue](https://sailsjs.com/documentation/concepts/deployment)
- [Sails.js - Seguridad](https://sailsjs.com/documentation/concepts/security)
- [Node.js - Documentación oficial](https://nodejs.org/en/docs)
- [EJS - Documentación](https://ejs.co/)
- [Bootstrap - Documentación oficial](https://getbootstrap.com/docs/5.3/)
- [bcrypt - npm](https://www.npmjs.com/package/bcrypt)
- [Render - Documentación](https://render.com/docs)
- [Neon - Documentación](https://neon.tech/docs)
- [MDN - HTML semántico](https://developer.mozilla.org/es/docs/Glossary/Semantics)

---

**Proyecto académico:** Tarea 3 - CRUD y Login con MVC
**Framework:** Sails.js
**Arquitectura:** Modelo-Vista-Controlador
**Asignatura:** Ingeniería Web
