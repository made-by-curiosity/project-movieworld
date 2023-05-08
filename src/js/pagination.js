import { getSearchMovies } from './fetchmoviedata';
import { refs } from './refs';
import { renderMovies } from './catalog';
import { backToTop } from './backtotop';

import Pagination from 'tui-pagination';

const container = refs.paginationEl;

export function createPagination(videos, query) {
  const options = {
    // below default value of options
    totalItems: `${videos.total_results}`,
    itemsPerPage: `${videos.results.length}`,
    visiblePages: 5,
    page: 1,
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
    console.log(currentPage);
    onPagination(query, currentPage);
  });
}

async function onPagination(query, currentPage) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getSearchMovies(query, currentPage);
    renderMovies(videos.results);
    backToTop();
  } catch (error) {
    console.log(error.message);
  }
}
