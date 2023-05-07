import Pagination from 'tui-pagination';
import { getSearchMovies } from './fetchmoviedata';
import { getSearchMovies } from './catalog';

const container = document.getElementById('pagination');
export const paginationSettings = {
  startPage: 1,
  searchType: null,
  pagination: null,
  totalItemsHome: null,
 };

const options = {
    page: 1,
    itemsPerPage: 20,
    totalItems: 100,
    visiblePages: 3,
    centerAlign: true,
    usageStatistics: false,
    firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>', 
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
paginationSettings.container = pagination;

const page = pagination.getCurrentPage();
// pagination.movePageTo(targetPage);
// pagination.reset(totalItems);

pagination.on('afterMove', evt => {
    const currentPage = evt.page;
    console.log(currentPage);
    });
return container;
