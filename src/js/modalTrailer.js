import { getMovieTrailer } from './fetchmoviedata';

document.querySelector('.hero').addEventListener('click', event => {
  const watchTrailerBtn = event.target.closest('.hero__btn');
  if (watchTrailerBtn) {
    const movieId = watchTrailerBtn.getAttribute('data-id');
    loadTrailerById(movieId);
  }
});

const modal = document.querySelector('.trailer-modal');
const movieContainer = modal.querySelector('.movie-container');
const trailerElement = modal.querySelector('.trailer-element');
const noVideoMsg = modal.querySelector('.no-video-msg');

async function loadTrailerById(movieId) {
  try {
    const movieTrailer = await getMovieTrailer(movieId);
    const videos = movieTrailer.results;
    if (videos.length > 0) {
      const videoKey = videos[0].key;
      const trailerUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
      showTrailerModal(trailerUrl, movieTrailer.poster_path);
    } else {
      showNoVideoMessage(movieTrailer.poster_path);
    }
  } catch (error) {
    console.error('Request video error', error);
  }
}

function showTrailerModal(trailerUrl, imageUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  trailerElement.style.width = '100%';
  trailerElement.style.height = '100%';
  modal.style.display = 'block';
  modal.classList.remove('hidden');
}

function showNoVideoMessage(posterUrl) {
  noVideoMsg.textContent =
    "Oops... We are very sorry! But we couldn't find the trailer.";
  movieContainer.innerHTML = `<img src="${posterUrl}" alt="Movie Poster">`;
  modal.style.display = 'block';
  modal.classList.remove('hidden');
}

// function closeTrailerModal() {
//   trailerElement.setAttribute('src', '');
//   noVideoMsg.textContent = '';
//   movieContainer.innerHTML = '';
//   modal.classList.add('hidden');
// }

const closeBtn = document.querySelector('.close-btn__svg');

closeBtn.addEventListener('click', closeTrailerModal);

function closeTrailerModal() {
  trailerElement.setAttribute('src', '');
  noVideoMsg.textContent = '';
  movieContainer.innerHTML = '';
  modal.style.display = 'none';
}
