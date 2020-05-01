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

// get details and cast of item based on media type and id 
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

// get list of items based on type, filtering and sorting 
router.get('/:type/filter_sort/:genre/:sort_by', (req, res) => {
  getListing(req.params.type, req.params.genre, req.params.sort_by)
    .then((items) => res.status(200).send(items));
});

// get list of items based on type and filtering 
router.get('/:type/filter_sort/:genre/', (req, res) => {
  getListing(req.params.type, req.params.genre, req.params.sort_by)
    .then((items) => res.status(200).send(items));
});

// get list of items based on type
router.get('/:type', (req, res) => {
  getListing(req.params.type)
    .then((items) => res.status(200).send(items));
});

// get list of similar items based on media type and id 
router.get('/similar/:type/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  getSimilar(req.params.type, id)
    .then((items) => res.status(200).send(items));
});

export default router;
