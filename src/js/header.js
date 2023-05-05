const buttonTogle = document.querySelector('.theme-switcher__button');
console.log(buttonTogle);

buttonTogle.addEventListener('click', () => {

    document.body.classList.toggle("light-theme");
});