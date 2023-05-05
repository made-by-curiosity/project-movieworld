const LOCALSTORAGE_KEY = 'movieworld';

export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// Структура объекта добавляемого в локал сторадж
// const movieworld = {
//   theme: 'dark',
//   savedMovies: [],
// };

// Достать из локал стораджа объект со всей сохранённой информацией
export function getSavedInfo() {
  const savedInfo = load(LOCALSTORAGE_KEY) || {};
  return savedInfo;
}

// Получить сохранённую тему
export function getCurrentTheme() {
  const currentTheme = getSavedInfo()?.theme || 'dark';
  return currentTheme;
}

// Сохранить текущую тему
export function saveCurrentTheme(currentTheme) {
  const savedInfo = getSavedInfo();

  const infoToSave = {
    ...savedInfo,
    theme: currentTheme,
  };

  save(LOCALSTORAGE_KEY, infoToSave);
}

// Получить массив сохранённых фильмов
export function getSavedMovies() {
  const savedMovies = getSavedInfo()?.savedMovies || [];

  return savedMovies;
}

// Сохранить фильм
export function saveMovie(movieId) {
  const savedInfo = getSavedInfo();
  const savedMovies = getSavedMovies();

  if (savedMovies.includes(movieId)) {
    return;
  }

  savedMovies.push(movieId);

  const infoToSave = {
    ...savedInfo,
    savedMovies,
  };

  save(LOCALSTORAGE_KEY, infoToSave);
}

// Удалить сохранённый фильм из хранилища
export function deleteSavedMovieId(idToDelete) {
  const savedInfo = getSavedInfo();
  const savedMovies = getSavedMovies();

  if (!savedMovies.includes(idToDelete)) {
    return;
  }

  const movieId = savedMovies.indexOf(idToDelete);

  savedMovies.splice(movieId, 1);

  const infoToSave = {
    ...savedInfo,
    savedMovies,
  };

  save(LOCALSTORAGE_KEY, infoToSave);
}
