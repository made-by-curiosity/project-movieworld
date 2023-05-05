import { getSearchMovies } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';

const formSearchEl = document.querySelector('.search-form');

formSearchEl.addEventListener('submit', onSearchMovies);

async function onSearchMovies(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value.trim();

  try {
    const videos = await getSearchMovies(query);
    createMovieCardMarkup(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}
