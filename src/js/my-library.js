import { getFullMovieInfo } from './fetchmoviedata';
import { checkAverange } from './checkrateaverage';
import { createMovieCardMarkup } from './createmoviecardmarkup';

const myLibrary = document.querySelector('.gallery');
// console.log('myLibrary', myLibrary);

// getFullMovieInfo(758323);

// console.log(
//   getFullMovieInfo(758323).then(data => console.log('library', data))
// );

const library = [];
getFullMovieInfo(758323).then(data => library.push(data));
getFullMovieInfo(758323).then(data => library.push(data));
console.log('library', library);

function renderMovies(movies) {
  const markup = createMovieCardMarkup(movies);
  myLibrary.insertAdjacentHTML('beforeend', markup);
  console.log('markup', markup);
}

renderMovies(library);
