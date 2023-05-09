import { refs } from './js/refs';
import { onLibraryPage } from './js/my-library';
import { onCatalogPage } from './js/catalog';
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
import './js/header';
import './js/mobile-menu';
import { onUpcomingPage } from './js/upcoming';

// примеры использования функций получения данных
// getDayTrends();
// getWeeklyTrends();
// getTodayMovies();
// getSearchMovies('Titanic');
// getFullMovieInfo(758323);
// getMovieTrailer(640146);
// getMoviesGenres();
// getMoviesCountries();

onUpcomingPage();

if (document.location.pathname.includes('/page-catalog')) {
  onCatalogPage();
}

if (document.location.pathname.includes('/page-my-library')) {
  onLibraryPage();
}
