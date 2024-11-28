import { Router } from 'express';
import * as authController from '@/controllers/auth.controller';
import { validate } from '@/middleware/validate';
import { z } from 'zod';
import { registerSchema, loginSchema } from '@/schemas';

const router = Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Retrieve an example message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional name to personalize the message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post(
  '/register',
  validate(z.object({ body: registerSchema })),
  authController.register
);

router.post(
  '/login',
  validate(z.object({ body: loginSchema })),
  authController.login
);

export default router;