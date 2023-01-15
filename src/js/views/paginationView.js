import View from "./View.js";
import icons from "../../img/icons.svg";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest("btn--inline"); // Goes up the DOM and finds the element
      console.log('btn');
      handler();
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    if (this._data.page === 1 && numPages > 1) { // First Page
      return `
      <button class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    if (this._data.page === numPages && numPages > 1) { // Last Page
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      `;
    }

    if (this._data.page < numPages) { // Any Other Page
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
    return "";
  }
}
export default new PaginationView();
