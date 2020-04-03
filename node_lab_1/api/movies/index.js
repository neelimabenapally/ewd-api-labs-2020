import express from 'express';
import {moviesObject} from './movies';

const moviesRouter = express.Router();

moviesRouter.get('/',(req,res) => {
    res.send(moviesObject);
});

// Post a movie
moviesRouter.post('/', (req, res) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie 
    moviesObject.movies.push(newMovie);
    res.status(200).send({
        status: 200,
        message: "Success! Movie Created",
        newMovie});
  } else {
    res.status(405).send({  
      message: "Invalid Movie Data",
      status: 405
    });
  }
});

// Update a movie
moviesRouter.put('/:id', (req, res) => {
  const key = parseInt(req.params.id);
  const updateMovie = req.body;
  console.log("updated movie in req",updateMovie);
  const index = moviesObject.movies.map((movie) => {
    return movie.id;
  }).indexOf(key);
  if (index !== -1) {
    !updateMovie.id ? updateMovie.id = key : updateMovie
    moviesObject.movies.splice(index, 1, updateMovie);
    console.log("updated movie",updateMovie);
    res.status(200).send({
        message : "Success, Movie Updated!",
        status: 200,
        updateMovie});
  } else {
    res.status(404).send({
      message: 'Unable to find Movie',
      status: 404
    });
  }
});

// Delete a movie
moviesRouter.delete('/:id', (req, res) => {
  const key =  parseInt(req.params.id);
  const index = moviesObject.movies.map((movie)=>{
return movie.id;
}).indexOf(key);
 if (index > -1) {
  moviesObject.movies.splice(index, 1);
     res.status(200).send({message: `Deleted movie id: ${key}.`,status: 200});
 } else {
   res.status(404).send({message: `Unable to find movie with id: ${key}.`, status: 404});
   }
});

export default moviesRouter;