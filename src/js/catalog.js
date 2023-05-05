const formSearchEl = document.querySelector('search-form');

formSearchEl.addEventListener('submit', onSearchMovies);

async function onSearchMovies(evt) {
  evt.preventDafault();
  console.log(evt.target);
}
