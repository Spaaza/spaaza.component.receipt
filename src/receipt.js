import * as handlebars from './receipt.handlebars';
import * as styles from 'raw-loader!./receipt.css';

/**
 * @class Receipt
 * @extends HTMLElement
 */

class Receipt extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    // fetch data
    let data = this.getData();
    if (!data) {
      throw 'Receipt: Data is missing, component needs <pre id="data"></pre> to initialize';
      return;
    }
    // process and render template
    this.shadow.innerHTML = handlebars(data);
    // attach stylesheet
    this.shadow.querySelector('#styles').innerHTML = styles;
    // console.log('connectedCallback')
  };

  // Called every time the element is removed from the DOM.
  // disconnectedCallback() {};

  // The behavior occurs when an attribute of the element is added, removed, updated, or replaced.
  // attributeChangedCallback(attr, oldVal, newVal) {};

  // Get data from <pre id="data"></pre>
  getData() {
    let d = this.shadow.host.querySelector('#data');
    return d.innerHTML ? JSON.parse(d.innerHTML) : false;
  }

// End Receipt
}

export default Receipt

customElements.define('spaaza-receipt', Receipt);
