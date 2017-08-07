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

    // when totals are available
    let hasData = this.data.subtotal || this.data.total;

    if (hasData) {
      this.append(divider);
      this.append(`<table class="receipt-totals">`);
    }

    if (this.data.subtotal) {
      this.append(`
        <tr class="receipt-subtotal">
          <td>Subtotal</td>
          <td class="align-right">${this.data.currencySymbol} ${amount(this.data.subtotal)}</td>
        </tr>
      `);
    }

    if (this.data.total) {
      this.append(`
        <tr class="receipt-strong">
          <td>Total</td>
          <td class="align-right">${this.data.currencySymbol} ${amount(this.data.total)}</td>
        </tr>
      `);
    }

    if (hasData) {
      this.append(`</table>`)
    }
  }
}
export default Totals

customElements.define('spaaza-totals', Totals);
