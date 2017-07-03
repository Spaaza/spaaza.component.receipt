/**
 * @class Component
 * @extends HTMLElement
 */

class Component extends HTMLElement {

  /**
   * @return {HTMLElement} Returns element instance
   */
  constructor() {
    super();
    // create the shadowDOM
    this.attachShadow({ mode: 'open' });
    // template placeholder
    this._template = ``;
    this._data = null;
  }

  /**
   * Extract data from <data></data> element
   * @return {object} Return an literal object with the component's data
   */
  get data() {
    // if data is already present ignore
    if (this._data) return this._data;
    let element = this.shadowRoot.host;

    // get data from embedded data element
    let d = element.querySelector('#data');
    if (d && d.textContent) {
      try {
        this._data = JSON.parse(d.textContent);
      } catch (e) {
        console.error(e);
      }
    }
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
    // draw only when data is available
    if (typeof this.data === 'undefined') return;
    // compile template
    this.compileTemplate();
    // attach render to shadowRoot
    this.shadowRoot.innerHTML = this._template;
  }
}

export default Component;
