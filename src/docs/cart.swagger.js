/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestión del carrito de compras del usuario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           example: 67ab12c3d456e78900112233
 *         quantity:
 *           type: number
 *           example: 2
 *
 *     Cart:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           example: 67aa11bb22cc33dd44ee55ff
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *
 *     AddOrUpdateItemInput:
 *       type: object
 *       required: [quantity]
 *       properties:
 *         quantity:
 *           type: number
 *           example: 3
 *
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito encontrado o creado automáticamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   post:
 *     summary: Agregar o actualizar un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddOrUpdateItemInput'
 *     responses:
 *       200:
 *         description: Ítem agregado o actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Eliminar un ítem del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ítem eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
 */

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Vaciar por completo el carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado exitosamente
 *       404:
 *         description: Carrito no existe
 */
