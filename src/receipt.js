import Component from './common/component.js';
import ReceiptDataParser from './data/receiptdataparser.js';

/**
 * @class Receipt
 * @extends Component
 */

class Receipt extends Component {

  // Monitor the 'async' attribute for changes.
  static get observedAttributes() { return ['redraw']; }

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./receipt.less')}</style>`);
    // first paint
    this.redraw();
  };

  // Called every time the element is removed from the DOM.
  // disconnectedCallback() {};

  // The behavior occurs when an attribute of the element is added, removed, updated, or replaced.
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'redraw') {
      this.redraw();
    }
  };

  redraw() {
    // create a instance of data parser
    this.parser = new ReceiptDataParser(this.data);
    // make sure it's empty
    this.shadowRoot.innerHTML = "";
    console.log("setting to empty", this.shadowRoot.innerHTML);
    // draw content
    this.draw();
  }

  /**
   * Compiles data and layout information into the template
   */
  compileTemplate() {
    if (typeof this.data === 'undefined') return;
    const namespace = 'spaaza';
    let output = {};

    const layout = {
      "HEADER": {
        "BRAND": true,
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
        "STORE": true
      }
    };


    for (let section in layout) {
      for (let component in layout[section]) {
        // compose a tag <spaaza-component>
        let tag = `${namespace}-${component.toLowerCase()}`;
        // make sure the output collections exists
        output[section] = output[section] || ``;
        // get data for that comoponent
        output[section] += `<${tag}><script id="data" type="application/json">${this.parser.getDataFor(component)}</script></${tag}>\n`;
      }
    }

    this.append(`
      <div class="main content">
        <section id="header">
          ${output.HEADER}
        </section>
        <section id="content">
          ${output.CONTENT}
        </section>
        <section id="footer">
          ${output.FOOTER}
        </section>
      </div>
    `);
  }
}

export default Receipt;

customElements.define('spaaza-receipt', Receipt);
