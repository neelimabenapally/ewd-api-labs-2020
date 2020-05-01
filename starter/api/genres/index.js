import express from 'express';
import {
  getGenres,
} from '../tmdb-api';

const router = express.Router();

// Get List of Genres based on type
router.get('/:type', (req, res) => {
  getGenres(req.params.type).then((genres) => res.status(200).send(genres));
});

export default router;
