import { getSearchMovies } from './fetchmoviedata';
import { getWeeklyTrendsPagination } from './fetchmoviedata';
import { refs } from './refs';
import { renderMovies } from './catalog';

import Pagination from 'tui-pagination';

const container = refs.paginationEl;

export function createCatalogPagination(videos, query) {
  const options = {
    // below default value of options
    totalItems: `${videos.total_results}`,
    itemsPerPage: `${videos.results.length}`,
    visiblePages: 3,
    page: 1,
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
    onCatalogPagination(query, currentPage);
  });
}

async function onCatalogPagination(query, currentPage) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getSearchMovies(query, currentPage);
    renderMovies(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}

export function createWeeklyTrendsPagination(trendsMovies) {
  const options = {
    // below default value of options
    totalItems: `${trendsMovies.total_results}`,
    itemsPerPage: `${trendsMovies.results.length}`,
    visiblePages: 3,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn js-theme tui-border">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected js-theme">{{page}}</strong>',
        currentPage: '<a href="#" class="tui-page-btn js-theme tui-is-selected">{{page}}</a>',
        moveButton:
        '<a href="#" class="tui-page-btn tui-next tui-prev hide-{{type}}"></a>',
      disabledMoveButton:
        '<span class="tui-is-disabled tui-{{type}}"></span>',
        moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">'+
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    onWeeklyTrendsPagination(currentPage);
  });
}

async function onWeeklyTrendsPagination(currentPage) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getWeeklyTrendsPagination(currentPage);
    renderMovies(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}
