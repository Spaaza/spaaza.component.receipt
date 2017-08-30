import { amount } from '../common/format';
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
    if (! (this.data.linetaxes && this.data.linetaxes.length)) {
      return;
    }

    const currencySymbol = this.data.currencySymbol;
    const strings = this.data.strings;

    this.append(divider);

    // create table header
    this.append(`
      <table class="receipt-linetaxes">
        <tr>
          <th class="align-left">${strings["tax-rate"]}</th>
          <th class="align-center">${strings["order-value"]}</th>
          <th class="align-right">${strings["tax-value"]}</th>
        </tr>
    `);

    // create a template for each element
    this.data.linetaxes.map(tax => {
      this.append(`
        <tr class="tax-line">
          <td class="var-rate align-left">${tax.rate}%</td>
          <td class="order-value align-center">${currencySymbol} ${amount(tax.order_value)}</td>
          <td class="vat align-right">${currencySymbol} ${amount(tax.tax_value)}</td>
        </tr>
      `);
    });

    // close table
    this.append(`</table>`);
  }
}
export default LineTaxes;

customElements.define('spaaza-linetaxes', LineTaxes);
