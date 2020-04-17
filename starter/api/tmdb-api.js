import fetch from 'node-fetch';

export const getListing = (type, genre = '') => {
    let apiUrl = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=1`;
    if (genre) {
      apiUrl = apiUrl + `&with_genres=${genre}`
    }

    return fetch(apiUrl).then(res => res.json())
  };
  
  
  export const getDetail = (type, id) => {
    return fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_KEY}`
    ).then(res => res.json());
  };

   export const getCast = (type, id) => {
    return fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.TMDB_KEY}`
    ).then(res => res.json());
  };
  
  export const getSimilar = (type, id) => {
    return fetch(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    ).then(res => res.json())
    ;
    
  };

  export const getGenres = (type) => {
    return fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    )
      .then(res => res.json())
  };

  export const getMovieReviews = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    )
      .then(res => res.json());
  };