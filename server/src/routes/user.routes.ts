import { Router } from 'express';
import * as userController from '@/controllers/user.controller';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { z } from 'zod';
import { updateUserSchema } from '@/schemas';
import { idSchema } from '@/schemas/common.schema';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', authorize(Role.ADMIN), userController.getUsers);

router.get(
  '/:id',
  validate(z.object({ params: z.object({ id: idSchema }) })),
  userController.getUser
);

router.patch(
  '/:id',
  validate(
    z.object({
      params: z.object({ id: idSchema }),
      body: updateUserSchema,
    })
  ),
  userController.updateUser
);

router.delete(
  '/:id',
  validate(z.object({ params: z.object({ id: idSchema }) })),
  authorize(Role.ADMIN),
  userController.deleteUser
);

export default router;