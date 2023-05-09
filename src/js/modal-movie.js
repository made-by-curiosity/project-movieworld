import { getFullMovieInfo } from './fetchmoviedata';
import { saveMovie, getSavedMovies } from './local-storage-service';

const openModalMovie = document.querySelector('.movie-gallery__list');
const backdrop = document.querySelector('.js-backdrop');
const closeModalMovie = document.querySelector(
  '[data-action="close-modal-movie"]'
);
const movieGalleryEl = document.querySelector('.movie-gallery__list');

let movieId;

movieGalleryEl.addEventListener('click', e => {
  e.preventDefault();
  const movieLinkEl = e.target.closest('.movie-gallery__link');
  if (movieLinkEl) {
    movieId = movieLinkEl.dataset.id;
  }
});

openModalMovie.addEventListener('click', onOpenModalMovie);
closeModalMovie.addEventListener('click', onCloseModalMovie);
backdrop.addEventListener('click', onCloseBackdropClick);

function onOpenModalMovie() {
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-modal-movie');

  getFullMovieInfo(movieId)
    .then(fullMovieInfo => {
      const original_title = fullMovieInfo.original_title;
      const vote_average = fullMovieInfo.vote_average;
      const vote_count = fullMovieInfo.vote_count;
      const popularity = fullMovieInfo.popularity;
      const genres = fullMovieInfo.genres.map(genre => genre.name).join(', ');
      const overview = fullMovieInfo.overview;
      const IMAGE_SRC = fullMovieInfo.poster_path
        ? `https://image.tmdb.org/t/p/original${fullMovieInfo.poster_path}`
        : 'https://raw.githubusercontent.com/made-by-curiosity/project-movieworld/main/src/images/moviecoverholder.jpg';
      const modalContainer = document.querySelector('.modal-movie.container');

      modalContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="modal-movie__poster-wrap" data-modal="modal-movie">
            <img class="modal-movie__poster js-modal" src="${IMAGE_SRC}" alt="movie image">
        </div>
        <div class="modal-movie__info">
            <h2 class="modal-movie__title js-modal">${original_title}</h2>
            <div class="modal-movie__info-wrap">
                <div class="modal-movie__info-title">
                    <p class="info-title__paragraph js-modal">Vote / Votes</p>
                    <p class="info-title__paragraph js-modal">Popularity</p>
                    <p class="info-title__paragraph js-modal">Genre</p>
                </div>
                <div class="modal-movie__info-value">
                    <p class="info-value__paragraph js-modal">
                    <span class="paragraph-span">${vote_average}</span>
                    /
                    <span class="paragraph-span">${vote_count}</span>
                    </p>
                    <p class="info-value__paragraph js-modal">${popularity}</p>
                    <p class="info-value__paragraph js-modal">${genres}</p>
                </div>
            </div>
            <div class="modal-movie__info-about">
                <h3 class="title-about js-modal">About</h3>
                <p class="paragraph-about js-modal">${overview}</p>
            </div>
            <div class="modal-movie__button-wrap">
                <button class="btn-lib btn js-modal" type="button" id="${movieId}">
                    Add to my library
                </button>
            </div>
        </div>
      `
      );

      const themeCheckbox = document.querySelector('.theme-switcher__input');

      if (themeCheckbox.checked) {
        toggleTheme();
      }

      function toggleTheme() {
        const elementsToChange = document.querySelectorAll('.js-modal');

        elementsToChange.forEach(element => {
          element.classList.toggle('light-theme');
        });
      }
    })
    .then(() => {
      const addToLibraryBtn = document.querySelector('.btn-lib.btn');

      checkSavedMovies();

      addToLibraryBtn.addEventListener('click', onMovieBtnClick);

      function onMovieBtnClick(event) {
        const movieId = event.target.id;
        saveMovie(movieId);
        addToLibraryBtn.innerText = 'In library';
        addToLibraryBtn.disabled = true;
      }

      function checkSavedMovies() {
        const movieId = addToLibraryBtn.id;
        const saveMovies = getSavedMovies();

        if (saveMovies.includes(movieId)) {
          addToLibraryBtn.innerText = 'In library';
          addToLibraryBtn.disabled = true;
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function onCloseModalMovie() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-modal-movie');
  const modalContainer = document.querySelector('.modal-movie.container');
  const modalContent = modalContainer.querySelectorAll(
    '.modal-movie__poster-wrap, .modal-movie__info, .modal-movie__button-wrap'
  );
  modalContent.forEach(content => content.remove());
}

function onCloseBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModalMovie();
  }
}

function onEscPress(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    onCloseModalMovie();
  }
}
