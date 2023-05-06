import { getFullMovieInfo } from './fetchmoviedata';
import { checkAverange } from './checkrateaverage';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import {
  saveMovie,
  getSavedMovies,
  getCurrentTheme,
  saveCurrentTheme,
} from './local-storage-service';

const myLibrary = document.querySelector('.movie-gallery__list');
const btnLibrary = document.querySelector('.btn-library');
const message = document.querySelector('.my-library__message');
const body = document.body;

if (body.classList.contains('light-theme')) {
  message.classList.add('my-library__message--light');
}

/// ----- для теста --- удалить
saveMovie(493529);
saveMovie(447365);
saveMovie(758323);
saveMovie(640146);
saveMovie(934433);
saveMovie(420808);
saveMovie(502356);
saveMovie(649609);
// saveCurrentTheme(dark),
/////------- удалить выше

renderFavoriteMovies();

async function renderFavoriteMovies() {
  const favoriteMoviesId = getSavedMovies();
  console.log(favoriteMoviesId);

  if (favoriteMoviesId.length === 14) {
    return;
  }

  btnLibrary.classList.add('library-isHidden');
  message.classList.add('library-isHidden');

  const moviesPromises = favoriteMoviesId.map(async movieId => {
    return await getFullMovieInfo(movieId);
  });

  const movies = await Promise.all(moviesPromises);

  markup = createMovieCardMarkup(movies);
  myLibrary.insertAdjacentHTML('beforeend', markup);
}
