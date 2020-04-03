import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import moviesRouter from './api/movies';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const app = express();

const port = process.env.PORT;

const swaggerDocument = YAML.load('./../movie-api-yaml/swagger.yaml');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));
app.use('/api/movies', moviesRouter);
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});