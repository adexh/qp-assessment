import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'admin123', // Replace with a hashed password in production
      role: 'ADMIN',
      name: 'Admin User',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: 'user123', // Replace with a hashed password in production
      role: 'USER',
      name: 'Regular User',
    },
  });

  // Seed Products (Grocery Items)
  const products = await prisma.product.createMany({
    data: [
      { name: 'Apples', description: 'Fresh red apples', price: 2.5, stock: 100, active: true },
      { name: 'Bananas', description: 'Ripe yellow bananas', price: 1.2, stock: 150, active: true },
      { name: 'Carrots', description: 'Crunchy orange carrots', price: 0.8, stock: 200, active: true },
      { name: 'Milk', description: '1L fresh milk', price: 1.5, stock: 50, active: true },
      { name: 'Eggs', description: 'Dozen eggs', price: 2.0, stock: 80, active: true },
      { name: 'Bread', description: 'Whole wheat bread', price: 1.8, stock: 60, active: true },
      { name: 'Rice', description: '1kg white rice', price: 3.0, stock: 120, active: true },
      { name: 'Chicken', description: '1kg fresh chicken', price: 7.5, stock: 40, active: true },
      { name: 'Potatoes', description: '5kg bag of potatoes', price: 5.0, stock: 70, active: true },
      { name: 'Tomatoes', description: 'Juicy red tomatoes', price: 2.2, stock: 90, active: true },
    ],
  });

  const productIds = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  const productMap = Object.fromEntries(
    productIds.map((product) => [product.name, product.id])
  );

  // Seed Orders
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      orderItems: {
        create: [
          { productId: productMap['Apples'], quantity: 2, price: 2.5 }, // Apples
          { productId: productMap['Bananas'], quantity: 1, price: 1.2 }, // Bananas
        ],
      },
    },
  });

  console.log({ admin, user, products, order });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
