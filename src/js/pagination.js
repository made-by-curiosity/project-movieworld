import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const Pagination = document.querySelector('.tui-pagination');

const paginationSettings = {
  startPage: 1,
  searchType: null,
  pagination: null,
  totalItemsHome: null,
};

const createMarkup = ({ page, itemsPerPage, totalItems }) => {
const options = {
    totalItems: 0,
    itemsPerPage: 10,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    // template: {
    //     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    //     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}p</strong>',
    //     currentPage: '<a href="#" class="tui-page-btn tui-is-selected">{{page}}</a>',
    //     moveButton:
    //       '<a href="#" class="tui-page-btn tui-{{type}} hide-{{type}}">' +
    //       <svg class="tui-ico-{{type}}" width="28" height="28"></svg> +
    //       '</a>',
    //     disabledMoveButton:
    //       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
    //       '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //       '</span>',
    //     moreButton:
    //       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip change-{{type}}">' +
    //       <svg class="tui-ico-ellip" width="14" height="14"></svg> +
    //       '</a>',
    // },
};

const pagination = new Pagination(pagination, options);
paginationSettings.pagination = pagination;


return pagination;
};