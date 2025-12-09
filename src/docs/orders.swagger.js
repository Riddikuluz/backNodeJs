/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de órdenes de compra
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           example: 67ab12c3d456e78900112233
 *         quantity:
 *           type: number
 *           example: 2
 *         priceAtPurchase:
 *           type: number
 *           example: 15990
 *
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           example: 67aa11bb22cc33dd44ee55ff
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           example: 31980
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, completed, cancelled]
 *           example: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     UpdateOrderStatusInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, completed, cancelled]
 *           example: paid
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden a partir del carrito del usuario
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orden creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Carrito vacío o productos no disponibles / stock insuficiente
 */

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Obtener todas las órdenes del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes (solo admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Orden no encontrada
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una orden (solo admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusInput'
 *     responses:
 *       200:
 *         description: Estado de la orden actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Orden no encontrada
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancelar una orden (usuario solo puede cancelar si está pendiente)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente
 *       403:
 *         description: No tienes permisos para cancelar esta orden
 *       404:
 *         description: Orden no encontrada
 */
