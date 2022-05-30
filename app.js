const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const gpsRoutes = require('./routes/gps');

const app = express();
app.enable('trust proxy');

app.use(cors());

app.options('*', cors());

// Setting security http
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limiting requests from the same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 30 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // To read req.body in POST

// Data sanitization against xss
app.use(xss());

app.use(cookieParser());

app.use(compression());

// v1 Routes middleware
app.use('/api/v1/gps', gpsRoutes);

module.exports = app;
