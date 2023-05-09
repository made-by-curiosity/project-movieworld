import { getSearchMovies, getWeeklyTrendsPagination } from './fetchmoviedata';
import { createCatalogPagination } from './pagination';
import { createWeeklyTrendsPagination } from './pagination';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { warningMessageMarkup } from './createwarningmessagemurkup';
import { refs } from './refs';

let page = 1;

export function onCatalogPage() {
  onWeeklyTrends();

  refs.formSearchEl.addEventListener('submit', onSearchMovies);

  async function onSearchMovies(evt) {
    refs.paginationEl.classList.remove('tui-pagination--is-hidden');

    evt.preventDefault();
    const query = evt.target.elements.searchQuery.value.trim();

    refs.galleryEl.innerHTML = '';
    refs.movieGalleryMessageEl.innerHTML = '';

    try {
      const videos = await getSearchMovies(query, page);

      createCatalogPagination(videos, query);

      if (videos.results.length === 0) {
        refs.paginationEl.classList.add('tui-pagination--is-hidden');
        renderWarningMessage();
        return;
      }

      if (videos.results.length < 20) {
        refs.paginationEl.classList.add('tui-pagination--is-hidden');
      }

      renderMovies(videos.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  // ===========Завантаження трендових фільмів тижня при переході на каталог=======

  async function onWeeklyTrends() {
    try {
      const trendsMovies = await getWeeklyTrendsPagination(page);
      renderMovies(trendsMovies.results);

      createWeeklyTrendsPagination(trendsMovies);
    } catch (error) {
      console.log(error.message);
      renderWarningMessage();
    }
  }

  function renderWarningMessage() {
    const markup = warningMessageMarkup();
    refs.movieGalleryMessageEl.insertAdjacentHTML('beforeend', markup);
  }

  refs.paginationEl.addEventListener('click', onSmothScroll);
}

export async function renderMovies(movies) {
  const markup = await createMovieCardMarkup(movies);

  refs.movieGalleryEl.insertAdjacentHTML('beforeend', markup);
}

function onSmothScroll() {
  const { height: galleryHeight } = document
    .querySelector('.movie-gallery__list')
    .getBoundingClientRect();
  window.scrollBy({ top: -galleryHeight, behavior: 'smooth' });
}
