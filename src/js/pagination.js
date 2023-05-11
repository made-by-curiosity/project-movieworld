import { getSearchMovies } from './fetchmoviedata';
import { getWeeklyTrendsPagination } from './fetchmoviedata';
import { refs } from './refs';
import { renderMovies } from './catalog';

import Pagination from 'tui-pagination';

const container = refs.paginationEl;

export function createCatalogPagination(videos, query, year) {
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

  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    await onCatalogPagination(query, currentPage, year);

    onSmothScroll();
  });
}

async function onCatalogPagination(query, currentPage, year) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getSearchMovies(query, currentPage, year);
    await renderMovies(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}

export async function createWeeklyTrendsPagination(trendsMovies) {
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

  pagination.on('afterMove', async event => {
    const currentPage = event.page;
    await onWeeklyTrendsPagination(currentPage);

    onSmothScroll();
  });
}

async function onWeeklyTrendsPagination(currentPage) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getWeeklyTrendsPagination(currentPage);
    await renderMovies(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}

function onSmothScroll() {
  const { height: heroHeight } = document
    .querySelector('.hero')
    .getBoundingClientRect();

  window.scroll({ top: heroHeight + 50, behavior: 'smooth' });
}
