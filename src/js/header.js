const buttonTogle = document.querySelector('.theme-switcher__button');

buttonTogle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
