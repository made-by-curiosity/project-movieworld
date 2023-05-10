import { getTodayMovies, getMoviesGenres } from './fetchmoviedata';
import {
  saveMovie,
  getSavedMovies,
  deleteSavedMovieId,
} from './local-storage-service';

export async function onUpcomingPage() {
  const movies = await getTodayMovies();

  const min = 0;
  const max = 19;
  const randomUpcomingMovie = Math.floor(Math.random() * (max - min + 1)) + min;

  const arrayDataMovies = movies.results[randomUpcomingMovie];
  const {
    id,
    title,
    popularity,
    release_date,
    vote_average,
    vote_count,
    overview,
  } = arrayDataMovies;

  const arrayGenres = [];

  const genres = await getMoviesGenres();

  genres.genres.forEach(genre => {
    if (arrayDataMovies.genre_ids.includes(genre.id)) {
      arrayGenres.push(genre.name);
    }
  });

  let IMAGE_URL = `https://image.tmdb.org/t/p/original${arrayDataMovies.backdrop_path}`;
  let SMALL_IMAGE_URL = `https://image.tmdb.org/t/p/w500${arrayDataMovies.poster_path}`;
  if (arrayDataMovies.poster_path === null) {
    IMAGE_URL =
      'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/moviecoverholder.jpg?raw=true';
    SMALL_IMAGE_URL =
      'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/moviecoverholder.jpg?raw=true';
  }

  const upcomingSection = document.querySelector('.section-upcoming');

  const markup = `<h2 class="upcoming-title js-theme js-upcoming">upcoming this month</h2>
  <div class="box">
    <div class="box-image">
        <img
          src=${IMAGE_URL}
					loading="lazy"
          alt="upcoming-film"
          class="upcoming-image-big"
        />
				<img
          src=${SMALL_IMAGE_URL}
					loading="lazy"
          alt="upcoming-film"
          class="upcoming-image-small"
        />
    </div>
    <div class="box-info">
      <h2 class="upcoming__film-title js-theme js-upcoming">${title}</h2>
      <!--   @media screen and (min-width: 768px) {display: none} -->
      <div class="upcoming__film-info">
        <ul>
          <li class="upcoming__info-item">Release date</li>
          <li class="upcoming__info-item">Vote / Votes</li>
          <li class="upcoming__info-item">Popularity</li>
          <li class="upcoming__info-item">Genre</li>
        </ul>
        <ul class="upcoming__wrapper-info-value">
          <li class="upcoming__info-value">
            <span class="upcoming__item-data">${release_date}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="upcoming__info-vote js-theme js-upcoming">${vote_average}</span>
            /
            <span class="upcoming__info-votes js-theme js-upcoming">${vote_count}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="popularity-value js-theme js-upcoming">${popularity}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="ganre-value js-theme js-upcoming">${arrayGenres.join(
              ', '
            )}</span>
          </li>
        </ul>
      </div>
      <!-- TABLET -->
      <div class="upcoming__information">
        <ul class="upcoming__info-list">
          <li class="upcoming__info-item">Release date</li>
          <li class="upcoming__info-item">Vote / Votes</li>
        </ul>
        <ul class="info-list">
          <li class="upcoming__info-value">
            <span class="upcoming__item-data">${release_date}</span>
          </li>
          <li>
            <span class="upcoming__info-vote js-theme js-upcoming">${vote_average}</span>
            /
            <span class="upcoming__info-votes js-theme js-upcoming">${vote_count}</span>
          </li>
        </ul>
        <ul class="info-list">
          <li class="upcoming__info-item">Popularity</li>
          <li class="upcoming__info-item">Genre</li>
        </ul>
        <ul class="info-list">
          <li class="upcoming__info-value">
            <span class="popularity-value js-theme js-upcoming">${popularity}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="ganre-value js-theme js-upcoming">${arrayGenres.join(
              ', '
            )}</span>
          </li>
        </ul>
      </div>

      <h2 class="upcoming__about-title">ABOUT</h2>
      <p class="upcoming__about-text light-theme-text js-theme js-upcoming">${overview}</p>
      <button type="button" class="btn btn-main btn-main__upcoming upcoming__btn-remind" data-id="${id}">Remind me</button>
			<button class="btn btn-main btn-main__upcoming upcoming__btn-remove lib-is-hidden" type="button" data-id="${id}">
			Remove from library
                </button>
    </div>
  </div>`;

  upcomingSection.innerHTML = markup;

  const themeCheckbox = document.querySelector('.theme-switcher__input');

  if (themeCheckbox.checked) {
    toggleTheme();
  }

  function toggleTheme() {
    const elementsToChange = document.querySelectorAll('.js-upcoming');

    elementsToChange.forEach(element => {
      element.classList.toggle('light-theme');
    });
  }

  const btnRemindMe = document.querySelector('.upcoming__btn-remind');
  const removeRemindBtn = document.querySelector('.upcoming__btn-remove');

  checkSavedMovies();

  btnRemindMe.addEventListener('click', onReamindMeClick);
  removeRemindBtn.addEventListener('click', onRemoveRemindBtnClick);

  function onReamindMeClick(event) {
    saveMovie(event.target.dataset.id);
    btnRemindMe.classList.add('lib-is-hidden');
    removeRemindBtn.classList.remove('lib-is-hidden');
  }

  function checkSavedMovies() {
    const movieId = btnRemindMe.dataset.id;

    const saveMovies = getSavedMovies();

    if (saveMovies.includes(movieId)) {
      btnRemindMe.classList.add('lib-is-hidden');
      removeRemindBtn.classList.remove('lib-is-hidden');
    }
  }

  function onRemoveRemindBtnClick(e) {
    const movieId = e.target.dataset.id;
    deleteSavedMovieId(movieId);

    btnRemindMe.classList.remove('lib-is-hidden');
    removeRemindBtn.classList.add('lib-is-hidden');
  }
}
