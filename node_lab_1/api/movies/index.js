import express from 'express';
import {moviesObject} from './movies';

const moviesRouter = express.Router();
moviesRouter.get('/',(req,res) => {
    res.send(moviesObject);
});

export default moviesRouter;