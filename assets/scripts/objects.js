// build app basic functionality first, work on form validation using HTML 5 or Regex
// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types

// to-do:
// toggle movie/search list functionality
// bug - same search elements can appear twice, 
// if both search terms are in the same title -consider array.from(new Set())

const movieList = document.getElementById("movie-list");
const searchList = document.getElementById("search-list");
const btnAddMovie = document.getElementById("btn-add-movie");
const btnSearch = document.getElementById("btn-search");
const movieInputs = document
	.getElementById("user-input")
	.querySelectorAll("input");
const searchInput = document.getElementById("filter-title");
const movies = new Map();

const showList = (targetElement) => targetElement.classList.add("visible");
const hideList = (targetElement) => targetElement.classList.remove("visible");
const toggleList = () => {};

const clearSearchResults = () => {
	while (searchList.lastChild) {
		searchList.removeChild(searchList.lastChild);
	}
};

const createAppendListElements = (targetList, title, extraInfoArr) => {
	const [extraInfoKey, extraInfoValue] = extraInfoArr;
	const li = document.createElement("li");
	li.innerHTML = `
  <div>
  <h2>${title}</h2> 
  <p>${extraInfoKey}: ${extraInfoValue}</p>
  </div>
  `;
	targetList === movieList ? movieList.appendChild(li) : searchList.appendChild(li);
};

const prepSearchElements = (titleMatches) => {
	for (const title of titleMatches) {
		createAppendListElements(
			searchList,
			title,
			Object.entries(movies.get(title)).flat()
		);
	}
};

// uses Regex to search map.keys() (movie titles) for exact search term
const searchMovieTitles = (searchTerms) => {
	const titleMatches = [];
	for (const searchTerm of searchTerms)
		titleMatches.push(
			Array.from(movies.keys()).filter((key) =>
				key.match(new RegExp("\\b" + searchTerm + "\\b", "i"))
			)
		);
	prepSearchElements(titleMatches.flat());
};

const saveMovieToMap = (title, key, value) => {
	movies.set(title, { [key]: value });
	createAppendListElements(
		movieList,
		title,
		Object.entries(movies.get(title)).flat()
	);
};

const validateSearchInput = () => (searchInput.value.trim() ? true : false);

const validateMovieInputs = () => {
	// add logic to validate keyName and value
	const movieTitle = movieInputs[0].value.trim();
	const key = movieInputs[1].value.trim() || "Extra Info";
	const value = movieInputs[2].value.trim() || "None!";
	movieTitle
		? movies.has(movieTitle)
			? alert("A movies with that title already exists.")
			: saveMovieToMap(movieTitle, key, value)
		: alert("Invalid movie title entered.");
};

const getSearchTerms = () => searchInput.value.split(" ");

const startSearch = () => searchMovieTitles(getSearchTerms());

const addMovieHandler = () => validateMovieInputs();

const searchMovieHandler = () =>
	validateSearchInput() ? startSearch() : alert("Invalid search input");

btnAddMovie.addEventListener("click", addMovieHandler);
btnSearch.addEventListener("click", searchMovieHandler);
