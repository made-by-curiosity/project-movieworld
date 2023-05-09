import { getFullMovieInfo } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { saveMovie, getSavedMovies } from './local-storage-service';

export function onLibraryPage() {
  const myLibrary = document.querySelector('.movie-gallery__list');
  const noMoviesMessage = document.querySelector('.no-movies-message');
  const btnLoadMore = document.querySelector('.btn-loadMore');

  btnLoadMore.addEventListener('click', renderFavoriteMovies);
  const itemsOnPage = 6;
  let page = 1;
  let start = 0;

  renderFavoriteMovies();

  async function renderFavoriteMovies() {
    const favoriteMoviesId = getSavedMovies();

    let end = start + itemsOnPage;
    const sliceMoviesId = favoriteMoviesId.slice(start, end);

    if (favoriteMoviesId.length === 0) {
      noMoviesMessage.classList.remove('library-isHidden');
      return;
    }

    const moviesPromises = sliceMoviesId.map(async movieId => {
      return await getFullMovieInfo(movieId);
    });

    const movies = await Promise.all(moviesPromises);

    const markup = await createMovieCardMarkup(movies);
    myLibrary.insertAdjacentHTML('beforeend', markup);

    if (favoriteMoviesId.length > itemsOnPage) {
      btnLoadMore.classList.remove('library-isHidden');
    }

    start += itemsOnPage;
    page += 1;

    if (end >= favoriteMoviesId.length) {
      btnLoadMore.classList.add('library-isHidden');
    } //-- скрыть кнопку Load More после отображения всех фильмов из Local Storage
  }
}
