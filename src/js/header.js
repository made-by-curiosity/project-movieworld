const buttonToggle = document.querySelector('.theme-switcher__button');
// console.log(buttonToggle);

buttonToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
  const elementsToChange = document.querySelectorAll('.js-theme');

  elementsToChange.forEach(element => {
    element.classList.toggle('light-theme');
  });
}
