const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const { apiLimiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());

if (config.env !== 'test') {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Employee Management System API Documentation',
}));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Employee Management System API is running', timestamp: new Date().toISOString() });
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management System Backend Running",
  });
});
app.use('/api/v1', apiLimiter, routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
