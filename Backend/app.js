const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const origin = ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth', require('./routes/authentication.route'));
app.use('/api/v1/s3', require('./routes/s3.route'));
app.use('/api/v1/cloud', require('./routes/cloud.route'));


app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found',
  });
});

module.exports = app;
