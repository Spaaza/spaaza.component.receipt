import * as handlebars from './receipt.handlebars';
import * as styles from 'raw-loader!./receipt.css';

function getDefaultLayout() {
  return {
    "HEADER": {
      "BRAND": true,
      "TITLE": true,
      "MESSAGE": true,
      "DETAILS": true
    },
    "CONTENT": {
      "LINEITEMS": true,
      "LINETAXES": true,
      "TOTALS": true,
      "WALLET": true,
      "DOWNLOAD": true
    },
    "FOOTER": {
      "MAP": true,
      "CONTACT": true,
      "ADDRESS": true,
      "MESSAGE": true
    }
  }
}

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
    // get layout information
    let layout = this.getLayout();
    // fetch data
    let data = this.getData();
    if (!data) {
      throw 'Receipt: Data is missing, component needs <pre id="data"></pre> to initialize';
      return;
    }
    // store layout information in template data
    data.LAYOUT = layout;
    console.log('processing tempalte with data', data);
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
    let d = this.shadow.host.querySelector('data');
    return d.innerHTML ? JSON.parse(d.innerHTML) : false;
  }

  getLayout() {
    let layout = {};
    let layoutElement = this.shadow.host.querySelector('layout');

    if (!layoutElement) {
      return getDefaultLayout();
    }

    function extractChildren(element) {
      if (!element.children.length) return element;
      let children = {};
      for (let child, i = 0; i < element.children.length; i += 1) {
        child = element.children[i];
        children[child.tagName] = extractChildren(child);
      }
      return children;
    }

    return extractChildren(layoutElement);
  }

// End Receipt
}

export default Receipt

customElements.define('spaaza-receipt', Receipt);
