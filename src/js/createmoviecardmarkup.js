import { checkAverange } from './checkrateaverage';
import { getMoviesGenres } from './fetchmoviedata';

export async function createMovieCardMarkup(movies) {
  const { genres } = await getMoviesGenres();

  const markup = movies.map(movie => {
    let IMAGE_URL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if (movie.poster_path === null) {
      IMAGE_URL =
        'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/moviecoverholder.jpg?raw=true';
    }
    const year = movie.release_date.slice(0, 4);
    const genresArray = [];

    genres.forEach(genre => {
      if (movie.genre_ids) {
        if (movie.genre_ids.includes(genre.id)) {
          genresArray.push(genre.name);
        }
      }

      if (movie.genres) {
        movie.genres.forEach(genre => {
          genresArray.push(genre.name);
        });
      }
    });

    const movieGenres = genresArray.slice(0, 2).join(', ');

    return `
        <li class="movie-gallery__item">
            <div class="movie-gallery__wrap">
                <a href="#" class="movie-gallery__link" data-id='${movie.id}'>
                    <img src="${IMAGE_URL}" alt="${
      movie.original_title
    }" loading="lazy" class="movie-gallery__image"/>
			<div class="movie-gallery__thumb">
                <div class="movie-gallery__info">
                <p class="movie-gallery__name">${movie.original_title}</p>
                <p class="movie-gallery__year"><span>${movieGenres}
       
      </span>${year}</p>
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
  });

  return markup.join('');
}
