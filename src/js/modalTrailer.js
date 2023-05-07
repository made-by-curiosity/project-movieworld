const showTrailerBtn = document.querySelector('.show-trailer-btn');
const modal = document.querySelector('.trailer-modal');
const trailerElement = modal.querySelector('.trailer-element');

// Отримання теми сайту (світла або темна)
function getSiteTheme() {
  const siteTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  return siteTheme;
}

// Функція для завантаження трейлера по ідентифікатору фільму
function loadTrailerById(movieId) {
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
        const imageUrl = 'path/to/trailer-image.png';
        showTrailerModal(trailerUrl, imageUrl);
      } else {
        showErrorModal();
      }
    })
    .catch(error => {
      console.error('Request video error', error);
    });
}

// Показ модального вікна з трейлером
function showTrailerModal(trailerUrl, imageUrl) {
  trailerElement.setAttribute('src', trailerUrl);
  modal.style.display = 'block';

  const siteTheme = getSiteTheme();
  updateModalBackground(siteTheme);

  const errorContainer = modal.querySelector('.error-container');
  if (errorContainer) {
    modal.removeChild(errorContainer);
  }

  const trailerImage = document.createElement('img');
  trailerImage.setAttribute('src', imageUrl);
  trailerElement.appendChild(trailerImage);

  trailerElement.contentWindow.postMessage(
    '{"event":"command","func":"' + 'playVideo' + '","args":""}',
    '*'
  );

  // Блокування подальшого поширення події кліку до елементу трейлера
  trailerElement.addEventListener('click', event => {
    event.stopPropagation();
  });
}

// Ховання модального вікна з трейлером
function hideTrailerModal() {
  modal.style.display = 'none';
  trailerElement.setAttribute('src', '');
}

// Відображення повідомлення про помилку разом із зображенням
function showErrorModal() {
  // Implement your error modal here
}

// Обробник кліку на кнопці "Show trailer"
showTrailerBtn.addEventListener('click', () => {
  const movieId = showTrailerBtn.dataset.movieId;
  loadTrailerById(movieId);
});

// Ініціалізація бібліотеки Lightbox
function initializeLightbox() {
  const lightbox = new SimpleLightbox('.show-trailer-btn', {
    elements: '.show-trailer-btn',
    history: false,
    docClose: false,
    nav: false,
    captionsData: 'alt',
    captionDelay: 250,
    captions: true,
    captionSelector: 'self',
    captionType: 'attr',
    captionPosition: 'bottom',
    captionsDataAlt: 'data-title',
    captionAttribute: 'alt',
  });

  // Додавання обробника кліку на кнопці "Show trailer" у Lightbox
  const lightboxItems = lightbox.elements;
  lightboxItems.forEach(item => {
    const showTrailerBtn = item;
    showTrailerBtn.addEventListener('click', event => {
      event.stopPropagation();
      const movieId = showTrailerBtn.dataset.movieId;
      loadTrailerById(movieId);
    });
  });
}

// Ініціалізація бібліотеки Lightbox після завантаження сторінки
window.addEventListener('DOMContentLoaded', () => {
  initializeLightbox();
});

// Обробник кліку на кнопці закриття
const closeBtn = modal.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
  hideTrailerModal();
});

// Обробник кліку поза модальним вікном
window.addEventListener('click', event => {
  if (event.target === modal) {
    hideTrailerModal();
  }
});
