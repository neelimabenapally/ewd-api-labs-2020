import express from 'express';
import Review from './reviewModel';

const router = express.Router();

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

  await Review.updateMany(
    {
      username: reviewDetails.username,
      mediaId: id,
      mediaType: type,
    },
    [{ $set: reviewDetails }],
    {
      rawResult: true,
      upsert: true,
    },
    async (err, result) => result,
  );
  res.status(200).send({ result: 'Added/Updated Review' });

  // getReviews(type, id).then(reviews => res.status(200).send(reviews));
});

router.get('/:type/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  const reviews = await Review.find({ mediaId: id, mediaType: type }, { rawResult: true }).select('username review');

  return res.status(200).send(reviews);
});

export default router;
