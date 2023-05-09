import {saveCurrentTheme, getCurrentTheme} from  './local-storage-service';


const inputState = document.querySelector('.theme-switcher__input');

// *************************************************
const result = getCurrentTheme();
// *************************************************

if (result === 'light') {
  inputState.checked = true
  onChangeTheme()
 }


inputState.addEventListener('click', (evt) => {
  onChangeTheme();
  saveCurrentState(evt.currentTarget);
});


function onChangeTheme() { 
  const elementsToChange = document.querySelectorAll('.js-theme');
  // додавання класу для світлої теми
  elementsToChange.forEach(element => {
    element.classList.toggle('light-theme');
  });
}
function saveCurrentState(input) { 
  // збереження типу теми
  let inputSaveState = input.checked;
  const themeData = inputSaveState ? 'light' : 'dark'
  
  saveCurrentTheme(themeData);
};
