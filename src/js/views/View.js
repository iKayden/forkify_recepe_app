import icons from "../../img/icons.svg";
export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const html = this._generateMarkup();
    if (!render) return html;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateMarkup();
    // Converts html to real DOM object (virtual DOM in memory)
    const newDOM = document.createRange().createContextualFragment(newHtml);
    // WIll be used to compare real DOM and this Virtual DOM and find differences and update them in case of any
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      // Creates an inside loop
      const currEl = currElements[i];
      // Update TEXT
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        currEl.textContent = newEl.textContent;
      }
      // Update attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(att => currEl.setAttribute(att.name, att.value));
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  };

  renderError(errMsg = this._errMsg) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMsg}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(msg = this._message) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }


}
