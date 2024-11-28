import pino from 'pino';
import { config } from '@/config';

export const logger = pino({
  level: config.env === 'development' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});