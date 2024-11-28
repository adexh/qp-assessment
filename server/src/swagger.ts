import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery API Doc',
      version: '1.0.0',
      description: 'This is API documentation for Grocery API created as an assignment for QP',
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);