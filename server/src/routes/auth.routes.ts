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
 *         description: A successful response
 */
router.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  authController.login
);

export default router;