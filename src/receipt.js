import { layout } from './common/receipt.layout.js';
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
    // fetch layout information from <layout> or use defaults
    this.layout = this.getLayout() || layout;
    // first paint
    this.redraw()
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./receipt.less')}</style>`);
    // this.draw();
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
    this.parser = new ReceiptDataParser(this.data, this.layout);
    // draw content
    this.draw();
  }

  /**
   * Compiles data and layout information into the template
   */
  compileTemplate() {
    if (typeof this.data === 'undefined') return;
    let output = {};
    let namespace = 'spaaza';

    for (let section in this.layout) {
      for (let component in this.layout[section]) {
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

  /**
   * @return {object} layout - layout information extracted from <layout></layout> element
   */
  getLayout() {
    // get layout definition
    let layoutElement = this.shadowRoot.host.querySelector('layout');
    // return default layout when no layout present
    if (!layoutElement) { return; }

    // extract children information from element
    function extractChildren(element) {
      // when no children, return content or element reference
      if (!element.children.length) {
        return element.innerHTML || element;
      };
      let children = {};
      // for all children
      for (let child, i = 0; i < element.children.length; i += 1) {
        child = element.children[i];
        // extract all children
        children[child.tagName] = extractChildren(child);
      }
      // return collection
      return children;
    }

    // extract children information from layoutElement
    return extractChildren(layoutElement);
  }

// End Receipt
}

export default Receipt

customElements.define('spaaza-receipt', Receipt);
