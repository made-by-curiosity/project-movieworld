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
    if (videos.results.length === 0) {
      renderWarningMessage();
      return;
    }
    renderMovies(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}

function renderMovies(movies) {
  const markup = createMovieCardMarkup(movies);
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
    renderMovies(trendsMovies.results);

    const { genres } = await getMoviesGenres();
    returnGenresList(genres);
  } catch (error) {
    console.log(error.message);
    renderWarningMessage();
  }
}

onWeeklyTrends();

// ===============Повернення строки з жанрами по id для розмітки=======

function returnGenresList(genres) {
  console.log(genres);
}

export function checkGenresById(genresIds) {
  console.log(genresIds);
  return 'Adventure';
}

//  genres.map(genre => {
//    if (genresIds.includes(genre.id)) {
//      console.log(genre.name);
//    }
//  });
