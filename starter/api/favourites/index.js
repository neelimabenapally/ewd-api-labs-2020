import express from 'express';
import Favourite from './favouriteModel';

const router = express.Router();

router.post('/:type/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  const { isFavourite } = req.body;

  console.log(req.params, isFavourite);
  if (!req.body.username) {
    return res.status(403).send('Username is required');
  }
  const favouriteDetails = {
    username: req.body.username,
    mediaType: type,
    mediaId: id,
  };

  if (isFavourite) {
    await Favourite.insertMany(
      favouriteDetails,
      async (err, result) => {
        console.log(err, result);
        return result;
      },
    );
  } else {
    await Favourite.remove(
      favouriteDetails,
      async (err, result) => result,
    );
  }

  res.status(200).send({ result: 'Success' });
});

router.get('/:username/:type', async (req, res, next) => {
  const { type } = req.params;
  const { username } = req.params;
  const favourites = await Favourite.find(
    { username, mediaType: type },
  );

  return res.status(200).send(favourites);
});

export default router;
