import express from 'express';
import User from './userModel';

const usersRouter = express.Router();

// Register/login a user
usersRouter.post('/', async (req, response) => {
  if (!req.body.username) {
    return response.status(401).json({
      success: false,
      msg: 'Please pass username.',
    });
  }

  const userDetails = {
    username: req.body.username,
    password: req.body.password,
  };
  
  const upsertUser = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: userDetails,
    },
    {
      upsert: true,
      projected: true,
      returnNewDocument: true,
      fields: {
        username: 1,
        password: 1,
      },
    }, async (err, signUpResponse) => signUpResponse,
  );

  return response.status(200).send(upsertUser);
});

export default usersRouter;
