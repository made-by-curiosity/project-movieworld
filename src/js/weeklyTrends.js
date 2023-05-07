// const axios = require('axios').default;
// const API_KEY = 'f1b5155c1184f9f972000fc60d38fc3a';

// export const getWeeklyTrends = async function getWeeklyTrends() {
//   const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
//   const params = {
//     api_key: API_KEY,
//   };

//   const response = await axios.get(BASE_URL, { params });
<<<<<<< Updated upstream

//   const weeklyTrends = await response.data;
//   console.log('weeklyTrends', weeklyTrends);

//   return weeklyTrends;
// };
=======
>>>>>>> Stashed changes

//   const weeklyTrends = await response.data;
//   console.log('weeklyTrends', weeklyTrends);

//   return weeklyTrends;
// };

const weeklyTrendsEl = document.querySelector('.films-list')



<<<<<<< Updated upstream
export default function getWeeklyTrends(data) {
  if (!data) {
    return;
  }
=======
export default function markUpFilms(data) {

>>>>>>> Stashed changes

  return data
    .map(
      ({
        poster_path: posterPath,
        genre_ids: genreIds,
        id: movieId,
        release_date: movieDate,
        title: title,
      }) => {
        let movieGenres = [];
        for (let i = 0; i < genreIds.length; i += 1) {
          let genre = genreIds[i];
          movieGenres.push(genre);
        }

        return `  
        <li class="item" id="${movieId}">
            <div class="item__image-box">
                <img src="${BASE_URL + posterPath}" alt="Poster of ${title ? title : ''}" />
                <div class="item__image-containet">
                    <p class="item__text">${title ? title : 'Title unavailable'}</p>
<<<<<<< Updated upstream
                    <p class="item__text-color">${movieGenres} | ${movieDate ? movieDate.slice(0, 4) : 'Date unavailable'}
=======
                  <p class="item__text-color">${movieGenres} | ${movieDate ? movieDate.slice(0, 4) : 'Date unavailable'}
>>>>>>> Stashed changes
                    </p>
                </div>
                {/* <div class="item__icon">
                    <svg class="item__svg" widht="86" height="14">
                        <use href="./images/symbol-defs.svg#icon-Frame-75-1"></use>
                    </svg>
                </div> */}
            </div>
        </li>
       `;
      },
    )
    .join('');
}
