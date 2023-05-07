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

function getFullMovieInfo(movieId) {
  const apiKey = 'f1b5155c1184f9f972000fc60d38fc3a';
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie information');
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function showTrailerModal(trailerUrl, imageUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  modal.classList.add('show');
  modal.classList.remove('hidden');

  const errorText = modal.querySelector('.no-video-msg');
  if (errorText) {
    modal.removeChild(errorText);
  }

  const trailerImage = document.createElement('img');
  trailerImage.setAttribute('src', imageUrl);
  trailerElement.append(trailerImage);

  const siteTheme = getSiteTheme();
  updateModalBackground(siteTheme);

  trailerElement.contentWindow.postMessage(
    '{"event":"command","func":"' + 'playVideo' + '"args":""}',
    '*'
  );
}

function showErrorModal() {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');

  const errorText = document.createElement('p');
  errorText.classList.add('no-video-msg');
  errorText.textContent =
    "OOPS... We are very sorry! But we couldn't find the trailer.";
  errorContainer.appendChild(errorText);

  const errorImage = document.createElement('img');
  errorImage.setAttribute('src', 'path/to/error-image.png');
  errorContainer.appendChild(errorImage);

  modal.appendChild(errorContainer);
}

function closeTrailerModal() {
  trailerElement.setAttribute('src', '');
  noVideoMsg.textContent = '';
  movieContainer.innerHTML = '';
  modal.classList.add('hidden');
}
