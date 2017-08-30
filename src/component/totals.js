import { amount } from '../common/format';
import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class Totals extends Component {
  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./totals.less')}</style>`);
    this.draw();
  }

  compileTemplate() {
    const data = this.data;
    const { strings } = data;

    this.append(divider);
    this.append(`<table class="receipt-totals">`);

    this.append(`
      <tr class="receipt-subtotal">
        <td>${strings.subtotal}</td>
        <td class="align-right">${data.currencySymbol} ${amount(data.subtotal)}</td>
      </tr>
    `);

    this.append(`
      <tr class="receipt-strong">
        <td>${strings.total}</td>
        <td class="align-right">${data.currencySymbol} ${amount(data.total)}</td>
      </tr>
    `);

    this.append(`</table>`)
  }
}
export default Totals;

customElements.define('spaaza-totals', Totals);
