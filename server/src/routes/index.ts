import { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import userRoutes from '@/routes/user.routes';
import adminRoutes from '@/routes/admin.routes';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *  - name: Auth
 *    description: All authentication APIs
 *  - name: User
 *    description: All user APIs
 *  - name: Admin
 *    description: All user APIs
 *  - name: Order
 *    description: Order APIs for users
 *  - name: Product
 *    description: Product APIs for users
 */

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);

export default router;