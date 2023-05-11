import { refs } from './refs';

export function DropDownMenu() {
  refs.dropDownBtnEl.addEventListener('click', onToogleDropDownMenu);

  function onToogleDropDownMenu() {
    refs.dropDownListEL.classList.toggle('dropdown__list--visible');
    refs.dropDownBtnEl.classList.toggle('dropdown-btn--rotate');
  }

  refs.dropDownListEL.addEventListener('click', onChangeValue);

  function onChangeValue(evt) {
    evt.stopPropagation();
    let yearValue = evt.target.textContent;
    refs.dropDownBtnEl.innerHTML = yearValue;
    refs.dropDownListEL.classList.remove('dropdown__list--visible');
    refs.yearValueEl.value = yearValue;
  }

  document.addEventListener('click', onCloseDropDown);

  function onCloseDropDown(evt) {
    if (evt.target !== refs.dropDownBtnEl) {
      refs.dropDownListEL.classList.remove('dropdown__list--visible');
      refs.dropDownBtnEl.classList.remove('dropdown-btn--rotate');
    }
  }
}
