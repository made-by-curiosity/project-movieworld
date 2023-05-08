import {
  getSearchMovies,
  getWeeklyTrends,
  getMoviesGenres,
} from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { warningMessageMarkup } from './createwarningmessagemurkup';
import { refs } from './refs';
import Pagination from 'tui-pagination';
import { options } from './pagination';

export function onCatalogPage() {
  onWeeklyTrends();
  
const pagination = new Pagination(refs.paginationContainer, options);
const page = pagination.getCurrentPage();


  refs.formSearchEl.addEventListener('submit', onSearchMovies);
pagination.on('afterMove', loadMoreMovies);

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

  async function renderMovies(movies) {
    const markup = await createMovieCardMarkup(movies);

    refs.movieGalleryEl.insertAdjacentHTML('beforeend', markup);
  }

  function renderWarningMessage() {
    const markup = warningMessageMarkup();
    refs.movieGalleryMessageEl.insertAdjacentHTML('beforeend', markup);
  }

  async function loadMoreMovies(event) {
    const currentPage = event.page;
   const response = await onWeeklyTrends(currentPage);
  }

  // ===========Завантаження трендових фільмів тижня при переході на каталог=======

  async function onWeeklyTrends() {
    try {
      const trendsMovies = await onWeeklyTrends();
      renderMovies(trendsMovies.results);
    } catch (error) {
      console.log(error.message);
      renderWarningMessage();
    }
  }
}
