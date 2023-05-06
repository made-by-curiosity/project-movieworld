const showTrailerBtn = document.querySelector('.show-trailer-btn');
const movieId = showTrailerBtn.dataset.movieId;
const modal = document.querySelector('.trailer-modal');
const trailerElement = modal.querySelector('.trailer');
const errorMessage = modal.querySelector('.no-video-msg');
const api_key = 'f1b5155c1184f9f972000fc60d38fc3a';

function showTrailerModal(trailerUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  modal.classList.add('show');
}

function hideTrailerModal() {
  modal.classList.remove('show');
  trailerElement.setAttribute('src', '');
  errorMessage.style.display = 'none';
}

function showErrorModal() {
  errorMessage.style.display = 'block';
}

showTrailerBtn.addEventListener('click', () => {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=YOUR_API_KEY&language=en-US`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request error');
    })
    .then(movieData => {
      const videos = movieData.results;
      if (videos.length > 0) {
        const videoKey = videos[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${videoKey}`;
        showTrailerModal(trailerUrl);
      } else {
        showErrorModal();
      }
    })
    .catch(error => {
      console.error('Request video error', error);
    });
});

modal.querySelector('.close-btn__svg').addEventListener('click', function () {
  hideTrailerModal();
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    hideTrailerModal();
  }
});
