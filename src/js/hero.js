import { getDayTrends } from "./fetchmoviedata";
import { checkAverange } from "./checkrateaverage.js";
import Swiper from 'swiper/swiper-bundle.esm';


const swiper = new Swiper('.swiper', {
  
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
        },
  },
  // Optional parameters
  loop: false,

  speed: 600,


  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
   delay: 3000,
 },
});

const section = document.querySelector(".hero");
const swiperBox = document.querySelector(".swiper-wrapper")

window.addEventListener('load', fetchMovie)

async function fetchMovie() { 
    try {
        const markup = await getHeroMarkup();
        updateHero(markup);
    } catch (err) {
        onerror(err)
    }
}

async function getHeroMarkup() {
  try {
    const { results } = await getDayTrends();
    const showMovie = results.slice(0, 5);
    return showMovie.reduce((markup, results) => markup + createMarkup(results), "")
  }
  catch (err) {
          onError(err);
        }
}

function createMarkup({ title, overview, backdrop_path, vote_average, id }) {
  let imageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    return `<div class="swiper-slide"><img src="${imageUrl}" alt="${
      title
    }" class="hero__image"/><div class="hero__container js-theme"><h1 class="hero__title js-theme">${title}</h1><img src='${checkAverange(vote_average)}' class="hero__rating"/>
        <p class="hero__text js-theme">${overview}</p>
        <button class="btn btn-main hero__btn" data-id="${id}">Watch trailer</button></div></div>`
}

function updateHero(markup) {
  if (markup !== undefined)
    swiperBox.insertAdjacentHTML("afterbegin", markup)
}

function onError(err) {
  const pathname = document.location.pathname;

  if (pathname === '/page-my-library.html') {
    section.classList.add("hero__cover-library");
  }
  section.classList.add("hero__cover")
  section.insertAdjacentHTML("beforeend", markupCover)
  console.error(err)
}


const markupCover = `<div class="hero__container js-theme">
        <h1 class="hero__title js-theme">Let’s Make Your Own Cinema</h1>
        <p class="hero__text js-theme">Is a guide to creating a personalized movie theater experience. You'll need a projector,
            screen, and speakers.</p>
        <a class="btn btn-main hero__btn">Get Started</button></a>
    </div>`



