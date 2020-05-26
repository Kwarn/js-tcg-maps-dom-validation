// build app, work on form validation using HTML 5
// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types

const btnAddMovie = document.getElementById('btn-add-movie');
const btnSearch = document.getElementById('btn-search');
const movieInputs = document
  .getElementById('user-input')
  .querySelectorAll('input');
const searchInput = document.getElementById('filter-title');
const movies = new Map();

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
    const searchTerms = searchInput.value.toLowerCase().split(' ');
    const keyToSearchTerms = Array.from(movies.keys()).map((key) =>
      key.toLowerCase().split(' ')
    );
    for (const key of searchTerms) {

      movies.has(key)
        ? console.log('has key')
        : console.log("doesn't have key");
    }
  }
};

btnAddMovie.addEventListener('click', addMovieHandler);
btnSearch.addEventListener('click', searchMovieHandler);
