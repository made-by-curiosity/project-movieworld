import getTodayMovies from './fetchmoviedata';

const getTodayMovies = async function getTodayMovies() {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/upcoming';
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const todayMovies = await response.data;
  console.log('todayMovies', todayMovies);

  return todayMovies;
};
