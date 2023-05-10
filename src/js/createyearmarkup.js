import { refs } from './refs';

const years = [
  2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005,
];

export function createDropdownYearList() {
  const markupYears = years
    .map(year => {
      return `<li class="dropdown__item">${year}</li>`;
    })
    .join('');

  refs.dropDownListEL.insertAdjacentHTML('beforeend', markupYears);
}
