import { getFullMovieInfo } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { saveMovie, getSavedMovies } from './local-storage-service';

export function onLibraryPage() {
  const myLibrary = document.querySelector('.movie-gallery__list');
  const noMoviesMessage = document.querySelector('.no-movies-message');
  const btnLoadMore = document.querySelector('.btn-loadMore');

  btnLoadMore.addEventListener('click', renderFavoriteMovies);
  const stepSlice = 6;
  let stepNumber = 1;

  /// ----- для теста --- удалить
  // saveMovie(493529);
  // saveMovie(447365);
  // saveMovie(758323);
  // saveMovie(640146);
  // saveMovie(934433);
  // saveMovie(420808);
  // saveMovie(502356);
  // saveMovie(649609);
  /////------- удалить выше

  renderFavoriteMovies();

  async function renderFavoriteMovies() {
    myLibrary.innerHTML = ''; //--очистка галереи фильмов

    const favoriteMoviesId = getSavedMovies();
    console.log(favoriteMoviesId);

    let end = stepSlice * stepNumber;
    const sliceMoviesId = favoriteMoviesId.slice(0, end);
    stepNumber += 1;
    console.log(sliceMoviesId);

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
  }
}

//////----------------- main version----------------
// async function renderFavoriteMovies() {
//   const favoriteMoviesId = getSavedMovies();
//   console.log(favoriteMoviesId);

//   const stepSlice = 5;
//   let start = 0;
//   let end = start + stepSlice;
//   let sliceMoviesId = favoriteMoviesId.slice(start, end);
//   console.log(sliceMoviesId);

//   if (favoriteMoviesId.length === 0) {
//     noMoviesMessage.classList.remove('library-isHidden');
//     return;
//   }

//   const moviesPromises = favoriteMoviesId.map(async movieId => {
//     return await getFullMovieInfo(movieId);
//   });

//   const movies = await Promise.all(moviesPromises);

//   const markup = createMovieCardMarkup(movies);
//   myLibrary.insertAdjacentHTML('beforeend', markup);
// }
