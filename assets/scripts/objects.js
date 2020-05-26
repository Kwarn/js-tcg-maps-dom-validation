// build app basic functionality first, work on form validation using HTML 5.
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

//validates userInput - *under-construction
//sets default nested object key and value if not entered
//adds object to movie MAP 
const addMovieHandler = () => {
  if (validateMovieTitleInput()) {
    const keyName = movieInputs[1].value || 'defaultKey';
    const value = movieInputs[2].value || 'defaultValue';
    movies.set(movieInputs[0].value, { [keyName]: value });
  }
};

// returns two arrays for comparison, composed from Movies titles and search input
const getSearchableArrays = () => {
  const searchTerms = searchInput.value.toLowerCase().split(' ');
  const movieTitlesAsSplitArrays = Array.from(movies.keys()).map((key) =>
    key.toLowerCase().split(' ')
  );
  return [searchTerms, movieTitlesAsSplitArrays]
}




const searchMovieHandler = () => {
  let matchingMovies = []
  if (validateSearchInput()) {
    const [searchTerms, titles] = getSearchableArrays()
    for (const key of searchTerms) {
      const title = movies.keys()
      for (const [idx, innerArr] of titles.entries()) {
        for (const str of innerArr) {
          if (str === key){
            matchingMovies.push(innerArr[idx])
            // cant access by index, only by key, 
            // get orginal key back from before .toLowerCase and split. somehow
            // split and lowercase while in loop to retain access to key-name
          }
        }
      }
    }
  }
  console.log(matchingMovies)
};

btnAddMovie.addEventListener('click', addMovieHandler);
btnSearch.addEventListener('click', searchMovieHandler);
