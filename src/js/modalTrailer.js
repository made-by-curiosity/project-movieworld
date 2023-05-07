import { getFullMovieInfo } from './fetchmoviedata.js';

document.getElementById('watchTrailerBtn').addEventListener('click', () => {
  const movieId = document.getElementById('watchTrailerBtn').dataset.movieId;
  loadTrailerById(movieId);
});

const modal = document.querySelector('.trailer-modal');
const movieContainer = modal.querySelector('.movie-container');
const trailerElement = modal.querySelector('.trailer-element');
const noVideoMsg = modal.querySelector('.no-video-msg');

async function loadTrailerById(movieId) {
  try {
    const movieInfo = await getFullMovieInfo(movieId);
    const videos = movieInfo.videos.results;
    if (videos.length > 0) {
      const videoKey = videos[0].key;
      const trailerUrl = `https://www.youtube.com/embed/${videoKey}`;
      showTrailerModal(trailerUrl, movieInfo.poster_path);
    } else {
      showNoVideoMessage(movieInfo.poster_path);
    }
  } catch (error) {
    console.error('Request video error', error);
  }
}

function showTrailerModal(trailerUrl, posterUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  movieContainer.innerHTML = `<img src="${posterUrl}" alt="Movie Poster">`;
  modal.classList.remove('hidden');
}

function showNoVideoMessage(posterUrl) {
  noVideoMsg.textContent = 'No trailer available.';
  movieContainer.innerHTML = `<img src="${posterUrl}" alt="Movie Poster">`;
  modal.classList.remove('hidden');
}

function closeTrailerModal() {
  trailerElement.setAttribute('src', '');
  noVideoMsg.textContent = '';
  movieContainer.innerHTML = '';
  modal.classList.add('hidden');
}

const movieId = '278';
loadTrailerById(movieId);
