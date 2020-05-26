// build app basic functionality first, work on form validation using HTML 5.
// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types

const btnAddMovie = document.getElementById('btn-add-movie');
const btnSearch = document.getElementById('btn-search');
const movieInputs = document
  .getElementById('user-input')
  .querySelectorAll('input');
const searchInput = document.getElementById('filter-title');
const movies = new Map();


// could use map instead of array for faster lookup time using .has() ?
const searchMoviesByKeys = () => {
  const searchTerms = searchInput.value.toLowerCase().split(' ');
  for (const key of movies.keys()) {
    const titleArr = key.toLowerCase().split(' ');
    for (const searchTerm of searchTerms) {
      if (titleArr.includes(searchTerm)) {
        return [key, movies.get(key)]
      }
    }
  }
};

const createListElements = () => {
  // to-do: creates list elements from title and extra information
}

const validateMovieTitleInput = () => (movieInputs[0].value ? true : false);

const validateSearchInput = () => (searchInput.value ? true : false);

const addMovieHandler = () => {
  if (validateMovieTitleInput()) {
    const keyName = movieInputs[1].value || 'defaultKey';
    const value = movieInputs[2].value || 'defaultValue';
    movies.set(movieInputs[0].value, { [keyName]: value });
  }
};

const searchMovieHandler = () => {
  if (validateSearchInput()) {
    createListElements(searchMoviesByKeys())
  }
};

btnAddMovie.addEventListener('click', addMovieHandler);
btnSearch.addEventListener('click', searchMovieHandler);

