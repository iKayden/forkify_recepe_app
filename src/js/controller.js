import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import "core-js/stable";
import "regenerator-runtime";
import { MODAL_CLOSE_SEC } from "./config.js";

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
    bookmarksView.update(model.state.bookmarks);

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
    paginationView.render(model.state.search);
    // render initial pagination btns
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

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(() => addRecipeView.toggleForm(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log("❗❗❗❗❗", err);
    addRecipeView.renderError(err.message);
  }
};

// Publisher <-> Subscriber pattern
// This is a Subscriber function
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
