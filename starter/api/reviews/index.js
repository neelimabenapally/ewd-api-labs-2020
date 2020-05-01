/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import express from 'express';
import Review from './reviewModel';

const router = express.Router();

//Posting a review 
router.post('/:type/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  if (!req.body.review || !req.body.username) {
    return res.status(403).send('Review and username are required');
  }
  const reviewDetails = {
    username: req.body.username,
    mediaType: type,
    mediaId: id,
    review: req.body.review,
  };

  await Review.updateMany(// Update review if present or add new review
    {
      username: reviewDetails.username,
      mediaId: id,
      mediaType: type,
    },
    { $set: reviewDetails },
    {
      rawResult: true,
      upsert: true,
    },
    async (err, result) => result,
  );
  return res.status(200).send({ result: 'Added/Updated Review' });
});

//get reviews
router.get('/:type/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  const reviews = await Review.find({ mediaId: id, mediaType: type }, { rawResult: true }).select('username review');

  return res.status(200).send(reviews);
});

export default router;
