import './db';
import dotenv from 'dotenv';
import express from 'express';
import {loadUsers, removeFavourites} from './seedData';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './authenticate';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import usersRouter from './api/users'; 

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerDocument = YAML.load('../movie-api-yaml/swagger.yaml');

const errorHandler=(err,req,res,next)=>{
  console.log(err);
  res.status(500).json({status: 500, message:"Internal Server Error"});
}

if (process.env.seedDb) {
  loadUsers();
  removeFavourites();
}

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

// app.use('/api/movies',  moviesRouter);
app.use('/api/listing', passport.authenticate('jwt', {session: false}), moviesRouter);
// app.use('/api/listing', moviesRouter);
app.use('/api/movie', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});