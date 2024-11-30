import { Router } from 'express';
import * as userController from '@/controllers/user.controller';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { z } from 'zod';
import { idSchema } from '@/schemas/common.schema';
import { Role } from '@prisma/client';
import { productInputSchema, productSchema, updateProductSchema } from '@/schemas/product.schema';
import * as adminController from '@/controllers/admin.controller';

const router = Router();

router.use(authenticate, authorize(Role.ADMIN));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get All products for Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get(
  '/products',
  adminController.getProducts
)

/**
 * @swagger
 * /api/admin/product/create:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *                name:
 *                  type: string
 *                  description: The name of the product
 *                description:
 *                  type: string
 *                  description: The description of the product
 *                price:
 *                  type: number
 *                  description: The price of the product
 *                stock:
 *                  type: number
 *                  description: stock of the product
 *                active:
 *                  type: boolean
 *                  description: 
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post(
  '/product/create',
  validate(
    z.object({
      body: productInputSchema
    })
  ),
  adminController.createProduct
)

/**
 * @swagger
 * /api/admin/product/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get Product by Id for Admin
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
  validate(
    z.object({
      params: z.object({ id: idSchema }),
    })
  ),
  adminController.getProductById
)

/**
 * @swagger
 * /api/admin/product/{id}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Udpate Product by Id for Admin
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
router.patch(
  '/product/:id',
  validate(
    z.object({
      params: z.object({ id: idSchema }),
      body: updateProductSchema,
    })
  ),
  adminController.updateProduct
);

/**
 * @swagger
 * /api/admin/product/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete Product by Id for Admin
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
router.delete(
  '/product/:id',
  validate(z.object({ params: z.object({ id: idSchema }) })),
  adminController.deleteProduct
);

export default router