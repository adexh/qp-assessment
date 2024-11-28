import { prisma } from '@/lib/prisma';
import { hashPassword, comparePasswords } from '@/utils/password';
import { generateToken } from '@/utils/jwt';
import { AppError } from '@/utils/error';
import { RegisterInput, LoginInput, AuthResponse } from '@/schemas';

export const register = async ({ email, password, name }: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};

export const login = async ({ email, password }: LoginInput): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken({ id: user.id, role: user.role });
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};