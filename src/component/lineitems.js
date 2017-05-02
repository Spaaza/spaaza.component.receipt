import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class LineItems extends Component {

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./lineitems.less')}</style>`);
    this.draw();
  }

  compileTemplate() {

    // when line items collections is available
    if (!this.data.lineitems || !this.data.lineitems.length) return;

    let currencySymbol = this.data.currencySymbol;

    this.append(divider);

    // create table header
    this.append(`
      <table class="receipt-lineitems">
        <tr>
          <th class="align-left">Name</th>
          <th class="align-center">Qty</th>
          <th class="align-right">Price</th>
        </tr>
    `);

    // create a template for each element
    this.data.lineitems.map(item => {
      // check if items needs to show original price
      let isOnSale = item.original_price > item.sale_price;
      this.append(`
        <tr class="line-item">
          <td class="align-left">
            <div class="line-item-name">${item.name}</div>
          </td>
          <td class="align-center">${item.quantity}</td>
          <td class="align-right">
            <span class="receipt-original-price ${isOnSale?'receipt-line-through':''}">${currencySymbol} ${item.original_price}</span>
            <span class="receipt-sale-price receipt-strong">${currencySymbol} ${item.sale_price}</span>
          </td>
        </tr>
      `);
    });

    // close table
    this.append(`</table>`);
  }
}
export default LineItems

customElements.define('spaaza-lineitems', LineItems);
