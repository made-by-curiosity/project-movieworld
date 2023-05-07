import {
  getSearchMovies,
  getWeeklyTrends,
  getMoviesGenres,
} from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { warningMessageMarkup } from './createwarningmessagemurkup';
import { refs } from './refs';

if (!document.location.pathname.includes('/page-catalog')) {
  return;
}

refs.formSearchEl.addEventListener('submit', onSearchMovies);

async function onSearchMovies(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value.trim();

  refs.galleryEl.innerHTML = '';
  refs.movieGalleryMessageEl.innerHTML = '';

  try {
    const videos = await getSearchMovies(query);
    const { genres } = await getMoviesGenres();
    if (videos.results.length === 0) {
      renderWarningMessage();
      return;
    }
    renderMovies(videos.results, genres);
  } catch (error) {
    console.log(error.message);
  }
}

function renderMovies(movies, genres) {
  const markup = createMovieCardMarkup(movies, genres);
  refs.movieGalleryEl.insertAdjacentHTML('beforeend', markup);
}

function renderWarningMessage() {
  const markup = warningMessageMarkup();
  refs.movieGalleryMessageEl.insertAdjacentHTML('beforeend', markup);
}

// ===========Завантаження трендових фільмів тижня при переході на каталог=======

async function onWeeklyTrends() {
  try {
    const trendsMovies = await getWeeklyTrends();
    const { genres } = await getMoviesGenres();
    renderMovies(trendsMovies.results, genres);
  } catch (error) {
    console.log(error.message);
    renderWarningMessage();
  }
}

onWeeklyTrends();
