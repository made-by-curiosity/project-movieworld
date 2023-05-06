const showTrailerBtn = document.querySelector('.show-trailer-btn');
const movieId = showTrailerBtn.dataset.movieId;
const modal = document.querySelector('.trailer-modal');
const trailerElement = modal.querySelector('.trailer');
const errorMessage = modal.querySelector('.no-video-msg');

// Отримання теми сайту (світла або темна)
function getSiteTheme() {
  const siteTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  return siteTheme;
}

// // Функція зміни фону модального вікна
// function updateModalBackground(theme) {
//   modal.style.backgroundColor = theme === 'dark' ? '#111111' : '#ffffff';
// }

// Показ модального вікна з трейлером
function showTrailerModal(trailerUrl, imageUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  modal.classList.add('show');

  const errorText = modal.querySelector('.no-video-msg');
  if (errorText) {
    modal.removeChild(errorText);
  }

  const trailerImage = document.createElement('img');
  trailerImage.setAttribute('src', imageUrl);
  trailerElement.append(trailerImage);

  const siteTheme = getSiteTheme();
  updateModalBackground(siteTheme);
}

// Ховання модального вікна з трейлером
function hideTrailerModal() {
  modal.classList.remove('show');
  trailerElement.setAttribute('src', '');
  const trailerImage = trailerElement.querySelector('img');
  if (trailerImage) {
    trailerElement.removeChild(trailerImage);
  }

  const errorText = modal.querySelector('.no-video-img');
  if (errorText) {
    modal.removeChild(errorText);
  }
}

// Відображення повідомлення про помилку
function showErrorModal() {
  const errorText = document.createElement('p');
  errorText.classList.add('no-video-msg');
  errorText.textContent =
    "OOPS... We are very sorry! But we couldn't find the trailer.";
  modal.appendChild(errorText);
}

// Обробник кліку на кнопці "Show trailer"
showTrailerBtn.addEventListener('click', () => {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f1b5155c1184f9f972000fc60d38fc3a&language=en-US`
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

// Обробник кліку на кнопці закриття
modal.querySelector('.close-btn').addEventListener('click', function () {
  hideTrailerModal();
});

// Обробник кліку поза модальним вікном
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    hideTrailerModal();
  }
});

// Оновлення фону модального вікна при зміні теми сайту
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    const newTheme = event.matches ? 'dark' : 'light';
    updateModalBackground(newTheme);
  });
