import express from 'express';
import {
  getGenres,
} from '../tmdb-api';

const router = express.Router();

router.get('/:type', (req, res) => {
  getGenres(req.params.type).then((genres) => res.status(200).send(genres));
});

export default router;
