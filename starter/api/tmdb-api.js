import fetch from 'node-fetch';

//Get List of items based on type
export const getListing = (type, genre = 0, sort_by = '') => {
  let apiUrl = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=1`;

  // Sorting and filtering
  if (genre !== '0') {
    // eslint-disable-next-line camelcase
    apiUrl += `&with_genres=${genre}&sort_by=${sort_by}`;
  } else {
    // eslint-disable-next-line camelcase
    apiUrl += `&sort_by=${sort_by}`;
  }
  return fetch(apiUrl).then((res) => res.json());
};

// Get Details of items based on type and id
export const getDetail = (type, id) => fetch(
  `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_KEY}`,
).then((res) => res.json());

// Get Cast of items based on type and id
export const getCast = (type, id) => fetch(
  `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.TMDB_KEY}`,
).then((res) => res.json());

// Get Similar movies/series based on type and id
export const getSimilar = (type, id) => fetch(
  `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`,
).then((res) => res.json());

// Get Genres List based on type
export const getGenres = (type) => fetch(
  `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.TMDB_KEY}&language=en-US`,
)
  .then((res) => res.json());
