import { getWeeklyTrends } from './fetchmoviedata.js';
import { createMovieCardMarkup } from './createmoviecardmarkup.js';

export async function renderWeekelyTrends() {
  const moviesAll = await getWeeklyTrends();

  const moviesToShow = moviesAll.results.slice(0, 3);
  console.log(moviesToShow);
  const weeklyTrendsMarkup = await createMovieCardMarkup(moviesToShow);

  const weeklyTrendsEl = document.querySelector('.films-list');

  weeklyTrendsEl.insertAdjacentHTML('beforeend', weeklyTrendsMarkup);
}
