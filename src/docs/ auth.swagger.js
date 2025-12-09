/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticación y roles
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@example.com
 *         password:
 *           type: string
 *           example: Password123!
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@example.com
 *         password:
 *           type: string
 *           example: Password123!
 *
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 *
 *     AssignRoleRequest:
 *       type: object
 *       required:
 *         - id
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           example: 65fa10a48c975c3df20c6b99
 *         role:
 *           type: string
 *           enum: [user, admin]
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario (siempre con rol "user")
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/AuthUser'
 *       400:
 *         description: Email ya registrado o datos inválidos
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Verificar token y obtener datos del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: Token inválido o ausente
 */

/**
 * @swagger
 * /api/auth/admin-only:
 *   get:
 *     summary: Endpoint solo para administradores
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       403:
 *         description: Requiere rol admin
 *       401:
 *         description: Token inválido o ausente
 */

/**
 * @swagger
 * /api/auth/assign-role:
 *   post:
 *     summary: Asignar un rol a un usuario (solo admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRoleRequest'
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Requiere rol admin
 */
