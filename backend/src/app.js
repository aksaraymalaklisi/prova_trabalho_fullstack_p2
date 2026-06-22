const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const motorcycleRoutes = require('./routes/motorcycleRoutes');
const clothingBrandRoutes = require('./routes/clothingBrandRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fullstack API',
      version: '1.0.0',
      description: 'API for CRUD operations',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      { name: 'Autenticação', description: 'Endpoints de autenticação e geração de token' },
      { name: 'Usuários', description: 'CRUD de Usuários (Requer privilégio de Admin)' },
      { name: 'Carros', description: 'CRUD de Carros' },
      { name: 'Motos', description: 'CRUD de Motos' },
      { name: 'Marcas de Roupa', description: 'CRUD de Marcas de Roupa' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/clothing-brands', clothingBrandRoutes);

module.exports = app;
