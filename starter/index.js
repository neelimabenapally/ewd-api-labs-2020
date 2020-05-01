/* eslint-disable no-unused-vars */
import './db';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import listingRouter from './api/listing';
import genresRouter from './api/genres';
import reviewsRouter from './api/reviews';
import favouritesRouter from './api/favourites';
import usersRouter from './api/users';


dotenv.config();

// eslint-disable-next-line import/prefer-default-export
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

export const app = express();
const port = process.env.PORT;
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev--wwrawg0.eu.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  audience: 'https://dev--wwrawg0.eu.auth0.com/api/v2/',
  issuer: 'https://dev--wwrawg0.eu.auth0.com/',
  algorithms: ['RS256'],
});

const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  res.status(err.status || 500).json({ status: err.status || 500, message: 'Internal Server Error', error: err.message });
};

// configure body-parser
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.use('/api/favourites', checkJwt, favouritesRouter);
app.use('/api/listing', checkJwt, listingRouter);
app.use('/api/genres', checkJwt, genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', checkJwt, reviewsRouter);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server running at ${port}`);
});
