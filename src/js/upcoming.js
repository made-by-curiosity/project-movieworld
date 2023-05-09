import { getTodayMovies, getMoviesGenres } from './fetchmoviedata';
import { saveMovie, getSavedMovies } from './local-storage-service';

export async function onUpcomingPage() {
  const movies = await getTodayMovies();
  const arrayDataMovies = movies.results[0];
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

  let IMAGE_URL = `https://image.tmdb.org/t/p/w500${arrayDataMovies.backdrop_path}`;
  if (arrayDataMovies.poster_path === null) {
    IMAGE_URL =
      'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/moviecoverholder.jpg?raw=true';
  }

  const upcomingSection = document.querySelector('.section-upcoming');

  const markup = `<h2 class="upcoming-title js-theme">upcoming this month</h2>
  <div class="box">
    <div class="box-image">
        <img
          src="https://image.tmdb.org/t/p/w500${arrayDataMovies.backdrop_path}"
          alt="upcoming-film"
          class="upcoming-image"
        />
    </div>
    <div class="box-info">
      <h2 class="upcoming__film-title js-theme">${title}</h2>
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
            <span class="upcoming__info-vote js-theme">${vote_average}</span>
            /
            <span class="upcoming__info-votes js-theme">${vote_count}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="popularity-value js-theme">${popularity}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="ganre-value js-theme">${arrayGenres.join(', ')}</span>
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
            <span class="upcoming__info-vote js-theme">${vote_average}</span>
            /
            <span class="upcoming__info-votes js-theme">${vote_count}</span>
          </li>
        </ul>
        <ul class="info-list">
          <li class="upcoming__info-item">Popularity</li>
          <li class="upcoming__info-item">Genre</li>
        </ul>
        <ul class="info-list">
          <li class="upcoming__info-value">
            <span class="popularity-value js-theme">${popularity}</span>
          </li>
          <li class="upcoming__info-value">
            <span class="ganre-value js-theme">${arrayGenres.join(', ')}</span>
          </li>
        </ul>
      </div>

      <h2 class="upcoming__about-title">ABOUT</h2>
      <p class="upcoming__about-text light-theme-text js-theme">${overview}</p>
      <button type="button" class="btn btn-main upcoming__btn-remind" data-id="${id}">Remind me</button>
    </div>
  </div>`;

  upcomingSection.innerHTML = markup;

  const btnReamindMe = document.querySelector('.upcoming__btn-remind');

  checkSavedMovies();

  btnReamindMe.addEventListener('click', onReamindMeClick);

  function onReamindMeClick(event) {
    saveMovie(event.target.dataset.id);
  }

  function checkSavedMovies() {
    const movieId = btnReamindMe.dataset.id;

    const saveMovies = getSavedMovies();

    if (saveMovies.includes(movieId)) {
      btnReamindMe.textContent = 'In library';
      btnReamindMe.disabled = true;
    }
  }
}
