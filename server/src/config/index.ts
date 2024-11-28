import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  env: process.env.NODE_ENV || 'development',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  cookieSecret: process.env.COOKIE_SECRET || 'cookie-secret',
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100,
} as const;