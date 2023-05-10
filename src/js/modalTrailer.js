import { getMovieTrailer } from './fetchmoviedata';

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero').addEventListener('click', event => {
    const watchTrailerBtn = event.target.closest('.hero__btn');
    if (watchTrailerBtn) {
      const movieId = watchTrailerBtn.getAttribute('data-id');
      loadTrailerById(movieId);
    }
  });

  const modal = document.querySelector('.trailer-modal');
  const trailerElement = modal.querySelector('.trailer-element');
  const closeButton = modal.querySelector('.close-btn__svg');

  async function loadTrailerById(movieId) {
    try {
      const movieTrailer = await getMovieTrailer(movieId);
      const videos = movieTrailer.results;
      if (videos.length > 0) {
        const videoKey = videos[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
        showTrailerModal(trailerUrl);
      } else {
        showNoVideoMessage();
      }
    } catch (error) {
      console.error('Request video error', error);
    }

    closeButton.style.display = 'block';
  }

  function showTrailerModal(trailerUrl) {
    trailerElement.setAttribute('src', trailerUrl);
    modal.style.display = 'block';
    modal.classList.remove('hidden');

    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.remove('hidden');
    noVideoMsg.classList.remove('error-msg');
  }

  function showNoVideoMessage() {
    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.remove('hidden');
    noVideoMsg.classList.add('error-msg');
  }

  closeButton.addEventListener('click', closeTrailerModal);

  function closeTrailerModal() {
    trailerElement.setAttribute('src', '');
    modal.style.display = 'none';
    closeButton.style.display = 'none';
    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.add('hidden');
    noVideoMsg.classList.remove('error-msg');
  }

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeTrailerModal();
    }
  });
});
