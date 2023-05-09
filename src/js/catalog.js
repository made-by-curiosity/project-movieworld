import { getSearchMovies, getWeeklyTrends } from './fetchmoviedata';
import { onPagination } from './pagination';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { warningMessageMarkup } from './createwarningmessagemurkup';
import { refs } from './refs';

import Pagination from 'tui-pagination';

const container = refs.paginationEl;

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

      const options = {
        // below default value of options
        totalItems: `${videos.total_results}`,
        itemsPerPage: `${videos.results.length}`,
        visiblePages: 3,
        page,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
          page: '<a href="#" class="tui-page-btn js-theme">{{page}}</a>',
          currentPage:
            '<strong class="tui-page-btn tui-is-selected js-theme">{{page}}</strong>',
            currentPage: '<a href="#" class="tui-page-btn js-theme tui-is-selected">{{page}}</a>',
            moveButton:
            '<a href="#" class="tui-page-btn js-theme tui-next tui-prev hide-{{type}}"></a>',
          disabledMoveButton:
            '<span class="tui-page-btn js-theme tui-is-disabled tui-{{type}}"></span>',
            moreButton:
            '<a href="#" class="tui-page-btn js-theme tui-{{type}}-is-ellip">'+
            '<span class="tui-ico-ellip">...</span>' +
            '</a>',
        },
      };
      const pagination = new Pagination(container, options);

      pagination.on('afterMove', event => {
        const currentPage = event.page;
        onPagination(query, currentPage);
      });

      console.log(videos.results);

      if (videos.results.length === 0) {
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
