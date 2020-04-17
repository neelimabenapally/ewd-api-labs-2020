import express from 'express';
import User from './userModel';
import Movie from './../movies/movieModel';
import jwt from 'jsonwebtoken';

const usersRouter = express.Router(); // eslint-disable-line

// Get all users
usersRouter.get('/', (req, res, next) => {
    User.find().then(users =>  res.status(200).json(users))
    .catch(next);
});

// register
// usersRouter.post('/', (req, res, next) => {
//     User.create(req.body)
//     .then(user => res.status(200)
//     .json({success:true,token:"FakeTokenForNow"}))
//     .catch(next)
// });

// Register/login a user
usersRouter.post('/', (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.json({
        success: false,
        msg: 'Please pass username and password.',
      });
    };
    if (req.query.action === 'register') {
      User.create({
        username: req.body.username,
        password: req.body.password,
      }).then(user => res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
      })).catch(next);
    } else {
      User.findByUserName(req.body.username).then(user =>{
      if (!user) return res.status(401).send({code: 401, msg: 'Authentication failed. User not found.'});
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.secret);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).send({
            code: 401,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }).catch(next);
  }});


// Update a user
usersRouter.put('/:id',  (req, res) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user))
    .catch(next);
});

usersRouter.post('/favourites/:userName', (req, res, next) => {
  const newFavourite = req.body;
  console.log("favourite",newFavourite);
  const userName = req.params.userName;
  if (newFavourite && newFavourite.id) {
      Movie.findOneAndUpdate({id: newFavourite.id},newFavourite,{new:true,upsert:true}).then(movie => {
          User.findByUserName(userName).then(
                  (user) => { 
                     (user.favourites.indexOf(movie._id)>-1)?user:user.favourites.push(movie._id.toString());
                     user.save().then(user => res.status(201).send(user))
                    }
          );
          }).catch((err) => console.log(err));
  } else {
      res.status(401).send("unable");
      
  }
});

usersRouter.get('/favourites/:userName', (req, res) => {
    const userName = req.params.userName;
    User.findByUserName(userName).populate('favourites').then(
        user => res.status(201).send(user.favourites)
    )

});

// authenticate a user
usersRouter.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
      res.status(401).send('authentication failed');
  } else {
      User.findByUserName(req.body.username).then(user => {
          if (user.comparePassword(req.body.password)) {
              req.session.user = req.body.username;
              req.session.authenticated = true;
              res.status(200).json({
                  success: true,
                  token: "temporary-token"
                });
          } else {
              res.status(401).json('authentication failed');
          }
      });
  }

});

export default usersRouter;