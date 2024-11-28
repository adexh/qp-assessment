import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import routes from '@/routes';
import { errorHandler, sanitizeInput, addRequestId } from '@/middleware';
import { config } from '@/config';
import { specs } from './swagger'
import swaggerUi  from 'swagger-ui-express'
import { logger } from '@/utils/logger';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request processing middleware
app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.use(sanitizeInput);
app.use(addRequestId);

// Swagger for Dev
if (config.env !== 'prod' && config.env !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// Logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use(
  rateLimit({
    windowMs: config.rateLimitWindow,
    max: config.rateLimitMax,
    message: 'Too many requests from this IP, please try again later.',
  })
);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;