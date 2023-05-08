import { getSearchMovies } from './fetchmoviedata';
import { refs } from './refs';
import { renderMovies } from './catalog';
import { backToTop } from './backtotop';

export async function onPagination(query, currentPage) {
  try {
    refs.galleryEl.innerHTML = '';
    const videos = await getSearchMovies(query, currentPage);
    renderMovies(videos.results);
    backToTop();
  } catch (error) {
    console.log(error.message);
  }
}
