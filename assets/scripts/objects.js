// build app basic functionality first, work on form validation using HTML 5 or Regex
// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types

// to-do:
// Maps only contain unique values, add duplicate user input handling
// add functionality to remove list elements and replace list with search results

const ul = document.getElementById('movie-list');
const btnAddMovie = document.getElementById('btn-add-movie');
const btnSearch = document.getElementById('btn-search');
const movieInputs = document
  .getElementById('user-input')
  .querySelectorAll('input');
const searchInput = document.getElementById('filter-title');
const movies = new Map();

const showMovieList = () => {
  ul.classList.add('visible');
};

const removeAllListElements = () => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const searchMovieKeys = (searchTerm) => {
  Array.from(movies.keys()).filter((key) => {
    if (key.toLowerCase().split().includes(searchTerm)) {
      removeAllListElements();
      createAppendListElements(key, Object.entries(movies.get(key)));
    }
  });
};

const startSearch = () => {
  const searchTerms = searchInput.value.toLowerCase().split(' ');
  for (const searchTerm of searchTerms) {
    searchMovieKeys(searchTerms);
  }
};

const createAppendListElements = (title, extraInfo) => {
  const [extraInfoName, extraInfoValue] = extraInfo[0];
  const li = document.createElement('li');
  li.innerHTML = `
    <div>
      <h2>${title}</h2> 
      <p>${extraInfoName}: ${extraInfoValue}</p>
    </div>
  `;
  ul.appendChild(li);
  showMovieList();
};

const validateMovieTitleInput = () => (movieInputs[0].value ? true : false);

const validateSearchInput = () => (searchInput.value ? true : false);

const addMovieHandler = () => {
  if (validateMovieTitleInput()) {
    const keyName = movieInputs[1].value || 'Extra Info';
    const value = movieInputs[2].value || 'None!';
    movies.set(movieInputs[0].value, { [keyName]: value });
  }
};

const searchMovieHandler = () => {
  if (validateSearchInput()) {
    startSearch();
  }
};

btnAddMovie.addEventListener('click', addMovieHandler);
btnSearch.addEventListener('click', searchMovieHandler);
