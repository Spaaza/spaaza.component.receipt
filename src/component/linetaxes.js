import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class LineTaxes extends Component {

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./linetaxes.less')}</style>`);
    this.draw();
  }

  compileTemplate() {

    // when line taxes collections is available
    if (!this.data.linetaxes || !this.data.linetaxes.length) return;

    let currencySymbol = this.data.currencySymbol;

    this.append(divider);

    // create table header
    this.append(`
      <table class="receipt-linetaxes">
        <tr>
          <th class="align-left">VAR Rate</th>
          <th class="align-center">Order value</th>
          <th class="align-right">VAT</th>
        </tr>
    `);

    // create a template for each element
    this.data.linetaxes.map(tax => {
      this.append(`
        <tr class="tax-line">
          <td class="var-rate align-left">${tax.rate}%</td>
          <td class="order-value align-center">${currencySymbol} ${tax.order_value}</td>
          <td class="vat align-right">${currencySymbol} ${tax.tax_value}</td>
        </tr>
      `);
    });

    // close table
    this.append(`</table>`);
  }
}
export default LineTaxes

customElements.define('spaaza-linetaxes', LineTaxes);
