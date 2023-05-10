import { refs } from './refs';

const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export function createDropdownYearList() {
  const markupYears = years
    .map(year => {
      return `<li class="dropdown__item">${year}</li>`;
    })
    .join('');

  refs.dropDownListEL.insertAdjacentHTML('beforeend', markupYears);
}
