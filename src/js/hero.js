import { getDayTrends } from "./fetchmoviedata";
import { checkAverange } from "./checkrateaverage.js";

const section = document.querySelector(".hero")

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
    const { results } = await getDayTrends()
    return createMarkup(results[1])
  }
  catch (err) {
          onError(err);
        }
}

function createMarkup({ title, overview, backdrop_path, vote_average }) {
  const imageUrl = `url(https://image.tmdb.org/t/p/original${backdrop_path})`;
  const gradient = "linear-gradient(87.8deg, #0E0E0E 15.61%, rgba(14, 14, 14, 0) 60.39%)";

  section.style.backgroundImage = `${gradient}, ${imageUrl}`;

    return `<div class="container"><h1 class="hero__title">${title}</h1><img src='${checkAverange(vote_average)}' class="hero__rating"/>
        <p class="hero__text">${overview}</p>
        <button class="btn btn-main hero__btn">Watch trailer</button></div>`
}

function updateHero(markup) {
  if (markup !== undefined)
    section.insertAdjacentHTML("beforeend", markup)
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


const markupCover = `<div class="container">
        <h1 class="hero__title">Let’s Make Your Own Cinema</h1>
        <p class="hero__text">Is a guide to creating a personalized movie theater experience. You'll need a projector,
            screen, and speakers.</p>
        <button class="btn btn-main hero__btn">Get Started</button>
    </div>`



