const movieGalleryEl = document.querySelector('.movie-gallery__list');

const AVERAGE = '/range.5524d30a.png';

console.log(AVERAGE);

export const createMovieCardMarkup = function MovieCardMarkup(movies) {
  const movieCardMarkUp = movies
    .map(movie => {
      const IMAGE_URL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      if (movie.vote_average > 7) {
        average = 'Добре';
      } else {
        average = 'Погано';
      }
      return `
        <li class="movie-gallery__item">
            <a href="#" class="movie-gallery__link">
                <img src="${IMAGE_URL}" alt="${movie.original_title}" width="360" />
            </a>
            <div class="movie-gallery__thumb">
                <div class="movie-gallery__info">
                <p class="movie-gallery__name">${movie.original_title}</p>
                <p class="movie-gallery__year">${movie.release_date}</p>
                </div>
                <p class="movie-gallery__range">
                <img src="${AVERAGE}" alt="range" />
                </p>
            </div>
        </li>`;
    })
    .join('');

  console.log(movieCardMarkUp);

  movieGalleryEl.insertAdjacentHTML('beforeend', movieCardMarkUp);
};
