import { getFullMovieInfo } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { getSavedMovies } from './local-storage-service';

export async function onLibraryPage() {
  const btnLoadMore = document.querySelector('.btn-loadMore');

  btnLoadMore.addEventListener('click', renderFavoriteMovies);

  await renderFavoriteMovies();
}

export async function renderFavoriteMovies() {
  //=========================== Start spinner
  document.body.classList.remove('loaded');
  //============================
  const myLibrary = document.querySelector('.movie-gallery__list');
  const btnLoadMore = document.querySelector('.btn-loadMore');

  const itemsOnPage = 6;
  let page = 1;
  let start = Number(myLibrary.children.length);

  const favoriteMoviesId = await getSavedMovies();

  const noMoviesMessage = document.querySelector('.no-movies-message');

  if (favoriteMoviesId.length === 0) {
    noMoviesMessage.classList.remove('library-isHidden');
    //===================== Stop spinner
    window.setTimeout(function () {
      document.body.classList.add('loaded');
    }, 500);
    //=====================

    return;
  }

  let end = start + itemsOnPage;
  const sliceMoviesId = favoriteMoviesId.slice(start, end);

  const moviesPromises = sliceMoviesId.map(async movieId => {
    return await getFullMovieInfo(movieId);
  });

  const movies = await Promise.all(moviesPromises);

  const markup = await createMovieCardMarkup(movies);
  myLibrary.insertAdjacentHTML('beforeend', markup);

  if (favoriteMoviesId.length > itemsOnPage) {
    btnLoadMore.classList.remove('library-isHidden');
  }

  if (end >= favoriteMoviesId.length) {
    btnLoadMore.classList.add('library-isHidden');
  } //-- скрыть кнопку Load More после отображения всех фильмов из Local Storage

  //===================== Stop spinner
  window.setTimeout(function () {
    document.body.classList.add('loaded');
  }, 500);
  //=====================
}
