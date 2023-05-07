
import { getWeeklyTrends } from './fetchmoviedata.js'
import { createMovieCardMarkup } from './createmoviecardmarkup.js'

// console.log(getWeeklyTrends());
export async function renderWeekelyTrends() {

  const moviesAll = await getWeeklyTrends();
  console.log(moviesAll);
  const moviesToShow = moviesAll.slice(0, 3);
  console.log(moviesToShow);
  const weeklyTrendsMarkup = await createMovieCardMarkup(moviesToShow);

  const weeklyTrendsEl = document.querySelector('.films-list');
  weeklyTrendsEl.insertAdjacentElement('beforeend', weeklyTrendsMarkup);

}

console.log(renderWeekelyTrends());





















// <<<<<<< Updated upstream
// export default function getWeeklyTrends(data) {
//   if (!data) {
//     return;
//   }
// =======
// export default function markUpFilms(data) {

// >>>>>>> Stashed changes

//   return data
//     .map(
//       ({
//         poster_path: posterPath,
//         genre_ids: genreIds,
//         id: movieId,
//         release_date: movieDate,
//         title: title,
//       }) => {
//         let movieGenres = [];
//         for (let i = 0; i < genreIds.length; i += 1) {
//           let genre = genreIds[i];
//           movieGenres.push(genre);
//         }

//         return `  
//         <li class="item" id="${movieId}">
//             <div class="item__image-box">
//                 <img src="${BASE_URL + posterPath}" alt="Poster of ${title ? title : ''}" />
//                 <div class="item__image-containet">
//                     <p class="item__text">${title ? title : 'Title unavailable'}</p>
// <<<<<<< Updated upstream
//                     <p class="item__text-color">${movieGenres} | ${movieDate ? movieDate.slice(0, 4) : 'Date unavailable'}
// =======
//                   <p class="item__text-color">${movieGenres} | ${movieDate ? movieDate.slice(0, 4) : 'Date unavailable'}
// >>>>>>> Stashed changes
//                     </p>
//                 </div>
//                 {/* <div class="item__icon">
//                     <svg class="item__svg" widht="86" height="14">
//                         <use href="./images/symbol-defs.svg#icon-Frame-75-1"></use>
//                     </svg>
//                 </div> */}
//             </div>
//         </li>
//        `;
//       },
//     )
//     .join('');
// }
