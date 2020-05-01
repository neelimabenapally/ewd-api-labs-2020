/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import express from 'express';
import Favourite from './favouriteModel';

const router = express.Router();

//Posting a Favourite
router.post('/:type/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { type } = req.params;
  const { isFavourite } = req.body;
  if (!req.body.username) {
    return res.status(403).send('Username is required');
  }
  const favouriteDetails = {
    username: req.body.username,
    mediaType: type,
    mediaId: id,
  };
// checking if favourite insert in DB else delete from DB
  if (isFavourite) {
    await Favourite.insertMany(
      favouriteDetails,
      async (err, result) => {
        return result;
      },
    );
  } else {
    await Favourite.remove(
      favouriteDetails,
      async (err, result) => result,
    );
  }

  return res.status(200).send({ result: 'Success' });
});

// Get Favourites
router.get('/:username/:type', async (req, res, next) => {
  const { type } = req.params;
  const { username } = req.params;
  const favourites = await Favourite.find(
    { username, mediaType: type },
  );

  return res.status(200).send(favourites);
});

export default router;
