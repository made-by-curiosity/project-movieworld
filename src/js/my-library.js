import { getFullMovieInfo } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { saveMovie, getSavedMovies } from './local-storage-service';

export function onLibraryPage() {
  const myLibrary = document.querySelector('.movie-gallery__list');
  const noMoviesMessage = document.querySelector('.no-movies-message');

  /// ----- для теста --- удалить
  saveMovie(493529);
  saveMovie(447365);
  saveMovie(758323);
  saveMovie(640146);
  saveMovie(934433);
  saveMovie(420808);
  saveMovie(502356);
  saveMovie(649609);
  /////------- удалить выше

  renderFavoriteMovies();

  async function renderFavoriteMovies() {
    const favoriteMoviesId = getSavedMovies();
    console.log(favoriteMoviesId);

    if (favoriteMoviesId.length === 0) {
      noMoviesMessage.classList.remove('library-isHidden');
      return;
    }

    const moviesPromises = favoriteMoviesId.map(async movieId => {
      return await getFullMovieInfo(movieId);
    });

    const movies = await Promise.all(moviesPromises);

    const markup = await createMovieCardMarkup(movies);
    myLibrary.insertAdjacentHTML('beforeend', markup);
  }
}
