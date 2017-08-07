import Component from '../common/component.js';
import { amount } from '../common/format';

class Details extends Component {

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./details.less')}</style>`);
    this.draw();
  }

  compileTemplate() {
    let hasData = this.data.message || this.data.total || this.data.id || this.data.date;

    if (hasData) {
      this.append(`<table>`);
    }

    if (this.data.message) {
      this.append(`<tr><td colspan="2">${this.data.message}</td></tr>`);
    }

    if (this.data.total) {
      this.append(`
        <tr class="receipt-strong">
          <td class="">CHARGED</td>
          <td class="align-right">${this.data.currencySymbol} ${amount(this.data.total)}</td>
        </tr>
      `);
    }
    if (this.data.id) {
      this.append(`
        <tr>
          <td class="">Order number</td>
          <td class="align-right">#${this.data.id}</td>
        </tr>
      `);
    }
    if (this.data.date) {
      this.append(`
        <tr>
          <td class="">Date</td>
          <td class="align-right">${new Date(this.data.date).toLocaleString('en-GB')}</td>
        </tr>
      `);
    }

    if (hasData) {
      this.append(`</table>`);
    }
  }
}
export default Details;

customElements.define('spaaza-details', Details);
