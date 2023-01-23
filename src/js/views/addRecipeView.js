import View from "./View.js";
import icons from "../../img/icons.svg";
class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  toggleForm() {
    this._overlay.classList.toggle(".hidden");
    this._window.classList.toggle(".hidden");
  }
  _addHandlerShowForm() {
    this._btnOpen.addEventListener("click", this.toggleForm.bind(this));
  }

  _addHandlerHideForm() {
    this._btnClose.addEventListener("click", this.toggleForm.bind(this));
    this._overlay.addEventListener("click", this.toggleForm.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      handler(data);
    });
  }
  _generateMarkup() { }

}
export default new AddRecipeView();
