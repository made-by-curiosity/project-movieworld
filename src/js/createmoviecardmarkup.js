import { checkAverange } from './checkrateaverage';
import { checkGenresById } from './catalog';

export function createMovieCardMarkup(movies) {
  return movies
    .map(movie => {
      let IMAGE_URL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      if (movie.poster_path === null) {
        IMAGE_URL = '/moviecoverholder.262f5a65.jpg';
      }
      const year = movie.release_date.slice(0, 4);

      return `
        <li class="movie-gallery__item">
            <div class="movie-gallery__wrap">
                <a href="#" class="movie-gallery__link" data-id='${movie.id}'>
                    <img src="${IMAGE_URL}" alt="${
        movie.original_title
      }" class="movie-gallery__image"/>
			<div class="movie-gallery__thumb">
                <div class="movie-gallery__info">
                <p class="movie-gallery__name">${movie.original_title}</p>
                <p class="movie-gallery__year">${year}<span>${checkGenresById(
        movie.genre_ids
      )}</span></p>
                </div>
                <p class="movie-gallery__range">
                <img src="${checkAverange(
                  movie.vote_average
                )}" alt="range" class='movie-gallery__range--size' />
                </p>
            </div>
                </a>
            </div>
            
        </li>`;
    })
    .join('');
}
