import { getDayTrends } from "./fetchmoviedata";

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
    return createMarkup(results[0])
  }
  catch (err) {
          onError(err);
        }
}

function createMarkup({ title, overview, backdrop_path }) {
    console.log(overview);
    return `<div class="container"><h1 class="hero__title">${title}</h1>
        <p class="hero__text">${overview}</p>
        <button class="btn btn-main hero__btn">Watch trailer</button></div>`
}

function updateHero(markup) {
  if (markup !== undefined)
    section.insertAdjacentHTML("beforeend", markup)
}

function onError(err) {
    console.error(err)
}


