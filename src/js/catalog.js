import { getSearchMovies, getWeeklyTrends } from './fetchmoviedata';
import { createPagination } from './pagination';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { warningMessageMarkup } from './createwarningmessagemurkup';
import { refs } from './refs';

let page = 1;

export function onCatalogPage() {
  onWeeklyTrends();

  refs.formSearchEl.addEventListener('submit', onSearchMovies);

  async function onSearchMovies(evt) {
    evt.preventDefault();
    const query = evt.target.elements.searchQuery.value.trim();

    refs.galleryEl.innerHTML = '';
    refs.movieGalleryMessageEl.innerHTML = '';

    try {
      const videos = await getSearchMovies(query, page);
      refs.paginationEl.classList.remove('is-hidden');

      createPagination(videos, query);

      if (videos.results.length === 0) {
        refs.paginationEl.classList.add('is-hidden');
        renderWarningMessage();
        return;
      }
      renderMovies(videos.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  // ===========Завантаження трендових фільмів тижня при переході на каталог=======

  async function onWeeklyTrends() {
    try {
      const trendsMovies = await getWeeklyTrends();
      renderMovies(trendsMovies.results);
    } catch (error) {
      console.log(error.message);
      renderWarningMessage();
    }
  }
}

function renderWarningMessage() {
  const markup = warningMessageMarkup();
  refs.movieGalleryMessageEl.insertAdjacentHTML('beforeend', markup);
}

export async function renderMovies(movies) {
  const markup = await createMovieCardMarkup(movies);

  refs.movieGalleryEl.insertAdjacentHTML('beforeend', markup);
}
