import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class Store extends Component {
  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./store.less')}</style>`);
    this.draw();
  }

  // Called before every draw().
  compileTemplate() {
    const data = this.data;
    const { strings } = data;

    if (! (data.name || data.message || data.address || data.contact || data.email || data.website || data.towncity || data.postalcode)) {
      return;
    }

    this.append(divider);
    this.append(`<table class="receipt-store">`);

    this.append(`
      <tr>
        <td class="align-left">
    `);

    if (data.name) {
      this.append(`
        <div>${data.name}</div>
      `);
    }
    if (data.email) {
      this.append(`
        <div><a href="mailto:${data.email}">${data.email}</a></div>
      `);
    }
    if (data.website) {
      this.append(`
        <div><a href="${data.website}" target="_blank">${data.website}</a></div>
      `);
    }

    this.append(`
      </td>
      <td class="align-right">
    `);

    if (data.contact) {
      this.append(`
        <a href="tel:${data.contact}">${data.contact}</a>
      `);
    }
    if (data.address) {
      this.append(`
        <div>${data.address}</div>
      `);
    }
    if (data.towncity && data.postalcode) {
      this.append(`<div>${data.towncity}, ${data.postalcode}</div>`);
    } else if (data.towncity && !data.postalcode) {
      this.append(`<div>${data.towncity}</div>`);
    } else if (!data.towncity && data.postalcode) {
      this.append(`<div>${data.postalcode}</div>`);
    }

    this.append(`
        </td>
      </tr>
    `);

    this.append(`</table>`);

    this.append(divider);

    if (strings.message) {
      this.append(`<p class="receipt-emphasys receipt-footer-message">${strings.message}</p>`);
    }
  }
}
export default Store;

customElements.define('spaaza-store', Store);
