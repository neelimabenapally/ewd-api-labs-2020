/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import express from 'express';
import {
  getListing,
  getDetail,
  getCast,
  getSimilar,
} from '../tmdb-api';

const router = express.Router();

router.get('/:type/view/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const result = {
    item: {},
    cast: {},
  };

  getDetail(req.params.type, id)
    .then((detail) => {
      result.item = detail;
    }).then(() => {
      getCast(req.params.type, id).then((cast) => {
        result.cast = cast.cast;
        res.status(200).send(result);
      });
    });
});

router.get('/:type/filter_sort/:genre/:sort_by', (req, res) => {
  console.log(req.params);
  getListing(req.params.type, req.params.genre, req.params.sort_by)
    .then((items) => res.status(200).send(items));
});

router.get('/:type/filter_sort/:genre/', (req, res) => {
  getListing(req.params.type, req.params.genre, req.params.sort_by)
    .then((items) => res.status(200).send(items));
});

router.get('/:type', (req, res) => {
  getListing(req.params.type)
    .then((items) => res.status(200).send(items));
});

router.get('/similar/:type/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  getSimilar(req.params.type, id)
    .then((items) => res.status(200).send(items));
});

export default router;
