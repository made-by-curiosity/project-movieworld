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
        visiblePages: 5,
        page,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
          page: '<a href="#" class="tui-page-btn">{{page}}</a>',
          currentPage:
            '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
          moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
          disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
          moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
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
