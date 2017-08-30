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
    const data = this.data;
    const { strings } = data;

    this.append(`<table>`);
 
    if (strings.message) {
      this.append(`<tr><td colspan="2">${strings.message}</td></tr>`);
    }

    if (data.total) {
      this.append(`
        <tr class="receipt-strong">
          <td class="">${strings.charged}</td>
          <td class="align-right">${data.currencySymbol} ${amount(data.total)}</td>
        </tr>
      `);
    }
    if (data.id) {
      this.append(`
        <tr>
          <td class="">${strings["order-number"]}</td>
          <td class="align-right">#${data.id}</td>
        </tr>
      `);
    }
    if (data.date) {
      this.append(`
        <tr>
          <td class="">${strings.date}</td>
          <td class="align-right">${new Date(data.date).toLocaleString(strings.langCode)}</td>
        </tr>
      `);
    }

    this.append(`</table>`);
  }
}
export default Details;

customElements.define('spaaza-details', Details);
