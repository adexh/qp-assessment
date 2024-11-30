import { Router } from 'express';
import * as authController from '@/controllers/auth.controller';
import { validate } from '@/middleware/validate';
import { z } from 'zod';
import { registerSchema, loginSchema } from '@/schemas';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Retrieve an example message
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
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adesh Tamrakar
 *               email:
 *                 type: string
 *                 example: adesh.t111@gmail.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123#
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post(
  '/register',
  validate(z.object({ body: registerSchema })),
  authController.register
);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Retrieve an example message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: adesh.t111@gmail.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123#
 *     responses:
 *       200:
 *         description: Login successful, JWT token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         name:
 *                           type: string
 *                         role:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                         updatedAt:
 *                           type: string
 *                     token:
 *                       type: string
 *                       description: JWT Token for authentication
 */
router.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  authController.login
);

export default router;