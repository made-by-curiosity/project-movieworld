import { getDayTrends } from "./fetchmoviedata";
import { checkAverange } from "./checkrateaverage.js";
import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
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
    }" class="hero__image"/><div class="hero__container"><h1 class="hero__title">${title}</h1><img src='${checkAverange(vote_average)}' class="hero__rating"/>
        <p class="hero__text">${overview}</p>
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


const markupCover = `<div class="hero__container">
        <h1 class="hero__title">Let’s Make Your Own Cinema</h1>
        <p class="hero__text">Is a guide to creating a personalized movie theater experience. You'll need a projector,
            screen, and speakers.</p>
        <button class="btn btn-main hero__btn">Get Started</button>
    </div>`



