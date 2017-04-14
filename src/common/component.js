/**
 * @class Component
 * @extends HTMLElement
 */

class Component extends HTMLElement {

  /**
   * Extract data from <data></data> element
   * @return {object} Return an literal object with the component's data
   */
  get data() {
    // if data is already present ignore
    if (this._data) return this._data;
    // get data tag from host
    let d = this.shadowRoot.host.querySelector('data');
    // store data or false
    this._data = d.innerHTML ? JSON.parse(d.innerHTML) : false;
    // return data object
    return this._data;
  }

  /**
   * Append a chunk of HTML to the component's template
   * @return {string} Return the compiled HTML template
   */
  get template() {
    return this._template;
  }

  /**
   * Append a chunk of HTML to the component's template
   * @param {string} chunk HTML chunk to add
   */
  append(chunk) {
    this._template += chunk;
  }

  /**
   * Draw template into shadow root
   */
  draw() {
    this.compileTemplate();
    this.shadowRoot.innerHTML = this._template;
  }

  /**
   * @return {HTMLElement} Returns element instance
   */
  constructor() {
    super();
    // create the shadowDOM
    this.attachShadow({ mode: 'open' });
    // template placeholder
    this._template = ``;
  }

// End Component
}

export default Component
