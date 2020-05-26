// build app basic functionality first, work on form validation using HTML 5.
// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types

// to-do: destructuring of extraInfo object, 
// current behaviour: Array.from(movies.get(key)) -> empty list

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

// could use map/set instead of array for faster lookup time using .has() ?
const searchMoviesByKeys = () => {
  const searchTerms = searchInput.value.toLowerCase().split(' ');
  for (const key of movies.keys()) {
    const titleArr = key.toLowerCase().split(' ');
    for (const searchTerm of searchTerms) {
      if (titleArr.includes(searchTerm)) {
        return [key, Array.from(movies.get(key))]; // problemo
      }
    }
  }
};

// creates list elements from title and extra information
const createListElements = ([title, extraInfo]) => {
  console.log(extraInfo)
  const [key, value] = extraInfo;
  const li = document.createElement('li');
  li.id = title;
  li.innerHTML = `
    <div>
      <h2>${title}</h2> 
      <p>${key}</p> <p> ${value} </p>
    </div>
  `;
  ul.appendChild(li)
  showMovieList()
  console.log('from here', title, extraInfo);
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
    createListElements(searchMoviesByKeys());
  }
};

btnAddMovie.addEventListener('click', addMovieHandler);
btnSearch.addEventListener('click', searchMovieHandler);
