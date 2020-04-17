import express from 'express';
import {
  getMovie, 
  getMovieReviews,
  getListing,
  getDetail,
  getCast,
  getSimilar
} from '../tmdb-api';
import wrap from 'express-async-wrapper';

const router = express.Router();

router.get('/:type', (req, res) => {
  getListing(req.params.type).then(movies => res.status(200).send(movies));
});

router.get('/:type/:genre', (req, res) => {
  getListing(req.params.type, req.params.genre).then(movies => res.status(200).send(movies));
});

router.get('/:type/view/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const result = {
    item: {},
    cast: {},
    similar: {}
  }
  getDetail(req.params.type, id)
  .then((detail) => { 
    result.item = detail
  }).then(() => {
    getCast(req.params.type, id).then((cast) => { 
      result.cast = cast.cast
    })
  }).then(() => {
    getSimilar(req.params.type, id).then((similar) => { 
      result.similar = similar.results
       
      res.status(200).send(result)
      
    })
  })
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id).then(reviews => res.status(200).send(reviews));
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  Movie.findMovieReviews(id)
  .then(results => res.status(200).send(results))
// getMovieReviews(id).then(movie => res.status(200).send(movie))
});

router.post('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  Movie.findByMovieDBId(id).then(movie => {
    movie.reviews.push(req.body)
    movie.save().then(res.status(200).send(movie.reviews))});
});

export default router;