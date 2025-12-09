# E-commerce Backend API

Una API REST completa para un sistema de e-commerce construida con **Node.js**, **Express** y **MongoDB**.

---

## 🚀 Características

- **Autenticación y Autorización:** JWT con roles de usuario y administrador  
- **Gestión de Usuarios:** CRUD completo con validaciones  
- **Catálogo de Productos:** Administración de productos con categorías y estado activo/inactivo  
- **Carrito de Compras:** Sistema de carrito personalizado por usuario  
- **Sistema de Órdenes:** Procesamiento de pedidos con control de stock  
- **Seguridad:** Sanitización XSS, protección contra NoSQL injection, rate limiting  
- **Documentación:** API documentada con Swagger

---

## 🛠️ Tecnologías

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Base de datos:** MongoDB con Mongoose  
- **Autenticación:** JWT (`jsonwebtoken`)  
- **Validación:** `express-validator`  
- **Seguridad:** `helmet`, `hpp`, `cors`, `xss-clean`
- **Documentación:** `swagger-jsdoc`, `swagger-ui-express`  

---

## 🌀 Control de Versiones y Flujo de Trabajo

Este proyecto se ha desarrollado siguiendo **Git Flow**:

- La rama principal de producción es `main`.  
- La rama de desarrollo activo es `dev`.  
- Las nuevas funcionalidades se desarrollan en ramas **feature/**, por ejemplo:
  - `feature/auth-login`
  - `feature/products-crud`
  - `feature/cart`
  - `feature/orders`
  - `feature/docs-swagger`
  - `feature/security-hardening`
- Cada feature se integra mediante **Pull Requests** a la rama `dev` y, tras las pruebas, se hace merge a `main` para producción.  

**Notas:**  
- Esto permite mantener `main` siempre estable.  
- `dev` sirve como entorno de integración y pruebas.  
---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Riddikuluz/backNodeJs.git
cd backNodeJs
````

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno en un archivo `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_secreto_jwt
LOG_LEVEL = dev // production
NODE_ENV = development // tiny, none
ALLOWED_ORIGINS= http://localhost:3000, http://localhost:5173
```
4. Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```
---

## 📚 Documentación de la API

La documentación Swagger estará disponible cuando el servidor se ejecute en **modo desarrollo**:

```
http://localhost:3000/api-docs
```
---

## 🔗 Endpoints Principales

### **Autenticación**

| Método | Ruta                    | Descripción                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/api/auth/register`    | Registrar nuevo usuario       |
| POST   | `/api/auth/login`       | Iniciar sesión                |
| GET    | `/api/auth/protected`   | Verificar token               |
| POST   | `/api/auth/assign-role` | Asignar rol a usuario (admin) |

### **Usuarios**

| Método | Ruta                      | Descripción              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/users`              | Listar usuarios (admin)  |
| GET    | `/api/users/:id`          | Obtener usuario por ID   |
| POST   | `/api/users`              | Crear usuario (admin)    |
| PUT    | `/api/users/:id`          | Actualizar usuario       |
| PUT    | `/api/users/:id/password` | Cambiar contraseña       |
| DELETE | `/api/users/:id`          | Eliminar usuario (admin) |

### **Productos**

| Método | Ruta                           | Descripción                 |
| ------ | ------------------------------ | --------------------------- |
| GET    | `/api/products`                | Listar productos            |
| GET    | `/api/products/:id`            | Obtener producto por ID     |
| POST   | `/api/products`                | Crear producto (admin)      |
| PUT    | `/api/products/:id`            | Actualizar producto (admin) |
| PUT    | `/api/products/deactivate/:id` | Desactivar producto (admin) |
| DELETE | `/api/products/:id`            | Eliminar producto (admin)   |

### **Carrito**

| Método | Ruta                   | Descripción                              |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `/api/cart`            | Obtener carrito del usuario              |
| POST   | `/api/cart/:productId` | Agregar o actualizar producto en carrito |
| DELETE | `/api/cart/:productId` | Eliminar producto del carrito            |
| DELETE | `/api/cart`            | Vaciar carrito                           |

### **Órdenes**

| Método | Ruta                     | Descripción                           |
| ------ | ------------------------ | ------------------------------------- |
| POST   | `/api/orders`            | Crear orden desde el carrito          |
| GET    | `/api/orders/my`         | Obtener mis órdenes                   |
| GET    | `/api/orders`            | Listar todas las órdenes (admin)      |
| GET    | `/api/orders/:id`        | Obtener orden por ID                  |
| PUT    | `/api/orders/:id/status` | Actualizar estado de la orden (admin) |
| PUT    | `/api/orders/:id/cancel` | Cancelar orden                        |

---

## 🔒 Sistema de Roles

* **Usuario (user):**

  * Gestionar su perfil
  * Administrar su carrito
  * Crear y ver sus órdenes
  * Cancelar órdenes pendientes

* **Administrador (admin):**

  * Todas las funcionalidades de usuario
  * Gestionar todos los usuarios
  * Administrar catálogo de productos
  * Ver y gestionar todas las órdenes
  * Asignar roles a usuarios

---

## 📁 Estructura del Proyecto

```
BACKNODEJS/
├─ src/
│ ├─ config/
│ │ ├─ corsOptions.js
│ │ ├─ db.js
│ │ ├─ logLevel.js
│ │ ├─ rateLimit.js
│ │ └─ swagger.js
│ ├─ controllers/
│ │ ├─ authController.js
│ │ ├─ cartController.js
│ │ ├─ ordersController.js
│ │ ├─ productsController.js
│ │ └─ usersController.js
│ ├─ docs/
│ │ ├─ auth.swagger.js
│ │ ├─ cart.swagger.js
│ │ ├─ orders.swagger.js
│ │ ├─ products.swagger.js
│ │ └─ users.swagger.js
│ ├─ middleware/
│ │ ├─ authGuard.js
│ │ ├─ productGuard.js
│ │ ├─ sanitizeMongo.js
│ │ ├─ sanitizeXSS.js
│ │ └─ validateObjectId.js
│ ├─ models/
│ │ ├─ Cart.js
│ │ ├─ Order.js
│ │ ├─ Product.js
│ │ └─ User.js
│ └─ routes/
│ ├─ authRoutes.js
│ ├─ cartRoutes.js
│ ├─ orderRoutes.js
│ ├─ productsRoutes.js
│ └─ usersRoutes.js
├─ app.js
├─ server.js
├─ .env
├─ .env.example
├─ package.json
└─ package-lock.json
```

---

## 🛡️ Seguridad

* **Autenticación JWT:** Tokens con expiración
* **Sanitización de datos:** Protección contra XSS y NoSQL injection
* **Rate limiting:** Límite de solicitudes por IP
* **CORS configurado:** Control de orígenes permitidos
* **Helmet:** Headers de seguridad HTTP
* **HPP:** Protección contra parameter pollution
* **Validación de entrada:** Datos validados robustamente

---

## 🔧 Scripts Disponibles

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
---

## 📊 Modelos de Datos

* **Usuario:** `email`, `password`, `role`
* **Producto:** `name`, `description`, `price`, `stock`, `category`, `status`, `images`
* **Carrito:** `user`, `items[{product, quantity}]`
* **Orden:** `user`, `items[{product, quantity, priceAtPurchase}]`, `total`, `status`

---

## 🚀 Despliegue

Para producción:

* Configurar `NODE_ENV=production`
* Usar una base de datos MongoDB segura
* Configurar un `JWT_SECRET` fuerte
* Configurar CORS con dominios específicos
* Usar HTTPS

---
