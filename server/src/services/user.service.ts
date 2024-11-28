import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/error';
import { Role } from '@prisma/client';
import { UpdateUserInput, UserResponse } from '@/schemas';

export const getUsers = async (): Promise<UserResponse[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput,
  currentUserId: string,
  currentUserRole: Role
): Promise<UserResponse> => {
  if (currentUserRole !== Role.ADMIN && currentUserId !== id) {
    throw new AppError('Not authorized', 403);
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: { id },
  });
};