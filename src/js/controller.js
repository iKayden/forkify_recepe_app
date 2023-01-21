import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import "core-js/stable";
import "regenerator-runtime";

// Keeps the state of the app after code has been changed
// if (module.hot) {
//   module.hot.accept();
// }


// https://forkify-api.herokuapp.com/v2
const controlRecipes = async function() {
  try {
    // GETting data
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading data
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    // Loading and storing current data in a state
    await model.loadRecipe(id);
    // Rendering Received Data
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    // Get search query from the form
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);
    // render results
    resultsView.render(model.getSearchResultsPage(1));
    // render initial pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log('err', err);
  }
};

const controlPagination = function(goToPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // render new pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings state
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // Add or Remove a bookmark
  if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};


// Publisher <-> Subscriber pattern
// This is a Subscriber function
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();
