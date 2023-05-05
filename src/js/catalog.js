import { getSearchMovies } from './fetchmoviedata';
import { createMovieCardMarkup } from './createmoviecardmarkup';
import { refs } from './refs';

if (!document.location.pathname.includes('/page-catalog')) {
  return;
}

refs.formSearchEl.addEventListener('submit', onSearchMovies);

async function onSearchMovies(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value.trim();

  refs.galleryEl.innerHTML = '';

  try {
    const videos = await getSearchMovies(query);
    createMovieCardMarkup(videos.results);
  } catch (error) {
    console.log(error.message);
  }
}
