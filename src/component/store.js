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

    let hasData = this.data.name || this.data.message || this.data.address || this.data.contact || this.data.email || this.data.website || this.data.towncity || this.data.postalcode;

    if (hasData) {
      this.append(divider);
      this.append(`<table class="receipt-store">`);
    }

    this.append(`
      <tr>
        <td class="align-left">
    `);

    if (this.data.name) {
      this.append(`
        <div>${this.data.name}</div>
      `);
    }
    if (this.data.email) {
      this.append(`
        <div><a href="mailto:${this.data.email}">${this.data.email}</a></div>
      `);
    }
    if (this.data.website) {
      this.append(`
        <div><a href="${this.data.website}" target="_blank">${this.data.website}</a></div>
      `);
    }

    this.append(`
      </td>
      <td class="align-right">
    `);

    if (this.data.contact) {
      this.append(`
        <div>${this.data.contact}</div>
      `);
    }
    if (this.data.address) {
      this.append(`
        <div>${this.data.address}</div>
      `);
    }
    if (this.data.towncity && this.data.postalcode) {
      this.append(`<div>${this.data.towncity}, ${this.data.postalcode}</div>`);
    } else if (this.data.towncity && !this.data.postalcode) {
      this.append(`<div>${this.data.towncity}</div>`);
    } else if (!this.data.towncity && this.data.postalcode) {
      this.append(`<div>${this.data.postalcode}</div>`);
    }

    this.append(`
        </td>
      </tr>
    `);

    if (hasData) {
      this.append(`</table>`);
    }

    this.append(divider);

    if (this.data.message) {
      this.append(`<p class="receipt-emphasys receipt-footer-message">${this.data.message}</p>`);
    }
  }
}
export default Store

customElements.define('spaaza-store', Store);
