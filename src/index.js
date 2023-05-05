import './js/catalog.js';

import {
  getSavedInfo,
  getCurrentTheme,
  saveCurrentTheme,
  getSavedMovies,
  saveMovie,
  deleteSavedMovieId,
} from './js/local-storage-service';
import {
  getDayTrends,
  getWeeklyTrends,
  getTodayMovies,
  getSearchMovies,
  getFullMovieInfo,
  getMovieTrailer,
  getMoviesGenres,
  getMoviesCountries,
} from './js/fetchmoviedata';

// примеры использования функций получения данных
getDayTrends();
getWeeklyTrends();
getTodayMovies();
getSearchMovies('Titanic');
getFullMovieInfo(758323);
getMovieTrailer(640146);
getMoviesGenres();
getMoviesCountries();
