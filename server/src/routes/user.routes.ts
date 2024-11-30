import { Router } from 'express';
import * as userController from '@/controllers/user.controller';

import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { z } from 'zod';
import { updateUserSchema } from '@/schemas';
import { idSchema } from '@/schemas/common.schema';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/users/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get Alls Products info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/products',
  userController.getProducts
)

/**
 * @swagger
 * /api/users/product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get Product info by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Product to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/product/:id',
  validate(z.object({ params: z.object({ id: idSchema }) })),
  userController.getProductById
);

/**
 * @swagger
 * /api/users/orders:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get all orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/orders',
  userController.getOrdersByUserId
)

/**
 * @swagger
 * /api/users/order:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create an order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderItems
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                    productId:
 *                      type: string
 *                      description: The Id the product
 *                    quantity:
 *                      type: integer
 *                      description: Quantity of the product
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post(
  '/order',
  userController.createOrder
)

/**
 * @swagger
 * /api/users/order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get Order info by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Order to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/order/:id',
  validate(z.object({ params: z.object({ id: idSchema }) })),
  userController.getOrderById
)

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get Profile info of logged-in User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/profile',
  userController.getProfileInfo
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user own profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: "b6e3e5a9-0812-49f7-bd5f-57043fc1333a"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.patch(
  '/:id',
  validate(
    z.object({
      body: updateUserSchema,
    })
  ),
  userController.updateLoggedInUser
);

export default router;