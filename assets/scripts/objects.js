/* 
to-do: flesh out validation
*/

const movieList = document.getElementById("movie-list");
const searchList = document.getElementById("search-list");
const btnAddMovie = document.getElementById("btn-add-movie");
const btnAllMovies = document.getElementById("btn-all-movies");
const btnSearch = document.getElementById("btn-search");
const movieInputs = document
  .getElementById("user-input")
  .querySelectorAll("input");
const searchInput = document.getElementById("filter-title");
const movies = new Map();

const showList = (targetElement) => targetElement.classList.add("visible");
const hideList = (targetElement) => targetElement.classList.remove("visible");

const clearSearchResults = () => {
  while (searchList.lastChild) {
    searchList.removeChild(searchList.lastChild);
  }
};

const appendListElements = (listTarget, li) => {
  if (listTarget === movieList) {
    movieList.appendChild(li);
    hideList(searchList);
    showList(movieList);
  }
  if (listTarget === searchList) {
    searchList.appendChild(li);
    hideList(movieList);
    showList(searchList);
  }
};

const createListElements = (listTarget, title, extraInfoArr) => {
  const [extraInfoKey, extraInfoValue] = extraInfoArr;
  const li = document.createElement("li");
  li.innerHTML = `
  <div>
  <h2>${title}</h2> 
  <p>${extraInfoKey}: ${extraInfoValue}</p>
  </div>
  `;
  appendListElements(listTarget, li);
};

// takes a Set of titles to avoid duplication
const prepSearchElements = (titleMatches) => {
  for (const title of titleMatches) {
    createListElements(
      searchList,
      title,
      Object.entries(movies.get(title)).flat()
    );
  }
};

// uses Regex to search map.keys(movie titles) for exact search term
const searchMovieTitles = (searchTerms) => {
  const titleMatches = [];
  for (const searchTerm of searchTerms)
    titleMatches.push(
      Array.from(movies.keys()).filter((key) =>
        key.match(new RegExp("\\b" + searchTerm + "\\b", "i"))
      )
    );
  if (titleMatches.flat()[0]) {
    clearSearchResults();
    prepSearchElements(new Set(titleMatches.flat()));
  } else alert("No movies matching those search terms found.");
};

const saveMovieToMap = (title, key, value) => {
  movies.set(title, { [key]: value });
  createListElements(
    movieList,
    title,
    Object.entries(movies.get(title)).flat()
  );
};

const validateSearchInput = () => (searchInput.value.trim() ? true : false);

const validateMovieInputs = () => {
  const movieTitle = movieInputs[0].value.trim();
  const key = movieInputs[1].value.trim() || "Extra Info";
  const value = movieInputs[2].value.trim() || "None!";
  movieTitle
    ? movies.has(movieTitle)
      ? alert("A movies with that title already exists.")
      : saveMovieToMap(movieTitle, key, value)
    : alert("Invalid movie title entered.");
};

const showAllMovies = () => {
  if (!movieList.classList.contains("visible")) {
    hideList(searchList);
    showList(movieList);
  }
};

const getSearchTerms = () => searchInput.value.split(" ");

const startSearch = () => searchMovieTitles(getSearchTerms());

const addMovieHandler = () => validateMovieInputs();

const searchMovieHandler = () =>
  validateSearchInput() ? startSearch() : alert("Invalid search input");

const showAllMoviesHandler = () =>
  movies.size
    ? showAllMovies()
    : alert("There are no movies in your collection.");

btnAddMovie.addEventListener("click", addMovieHandler);
btnSearch.addEventListener("click", searchMovieHandler);
btnAllMovies.addEventListener("click", showAllMoviesHandler);
