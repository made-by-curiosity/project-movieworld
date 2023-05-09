const axios = require('axios').default;
const API_KEY = 'f1b5155c1184f9f972000fc60d38fc3a';

// ===== Трендові фільми дня  -https://developers.themoviedb.org/3/trending/get-trending========

export const getDayTrends = async function getDayTrends() {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const dayTrends = await response.data;

  console.log('dayTrends', dayTrends);
  return dayTrends;
};

// ===== Трендові фільми тижня  -https://developers.themoviedb.org/3/trending/get-trending========

export const getWeeklyTrends = async function getWeeklyTrends() {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const weeklyTrends = await response.data;
  console.log('weeklyTrends', weeklyTrends);

  return weeklyTrends;
};

// ===== Нові фільми   -https://developers.themoviedb.org/3/movies/get-upcoming========

export const getTodayMovies = async function getTodayMovies() {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/upcoming';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const todayMovies = await response.data;
  console.log('todayMovies', todayMovies);

  return todayMovies;
};

// / ===== Фільми за ключовим словом   -https://developers.themoviedb.org/3/search/search-movies========

export const getSearchMovies = async function getSearchMovies(query, page) {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const params = {
    api_key: API_KEY,
    query: ` ${query}`,
    page: `${page}`,
  };

  const response = await axios.get(BASE_URL, { params });

  const searchMovies = await response.data;
  console.log('searchMovies', searchMovies);

  return searchMovies;
};

// / ===== Детальна інформація про фільм   -https://developers.themoviedb.org/3/movies/get-movie-details========

export const getFullMovieInfo = async function getFullMovieInfo(movie_id) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movie_id}`;
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const fullMovieInfo = await response.data;
  console.log('fullMovieInfo', fullMovieInfo);

  return fullMovieInfo;
};

// / / ===== Повна інформація про можливий трейлер фільма на YouTube  -https://developers.themoviedb.org/3/movies/get-movie-videos========

export const getMovieTrailer = async function getMovieTrailer(movie_id) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const movieTrailer = await response.data;
  console.log('movieTrailer', movieTrailer);

  return movieTrailer;
};

// / / ===== Перелік жанрів	https://developers.themoviedb.org/3/genres/get-movie-list========

export const getMoviesGenres = async function getMoviesGenres() {
  const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const genres = await response.data;
  console.log('genres', genres);

  return genres;
};

// / / ===== Перелік країн	https://developers.themoviedb.org/3/configuration/get-countries========

export const getMoviesCountries = async function getMoviesGenres() {
  const BASE_URL = 'https://api.themoviedb.org/3/configuration/countries';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const countries = await response.data;
  console.log('countries', countries);

  return countries;
};
