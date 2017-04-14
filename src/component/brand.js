import Component from '../common/component.js';

class Brand extends Component {

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./brand.less')}</style>`);
    this.draw();
  }

  compileTemplate() {

    let hasData = this.data.logoURL || this.data.title || this.data.message;

    if (hasData) {
      this.append(`<table>`);
    }

    if (this.data.logoURL) {
      this.append(`
        <tr>
          <td><img src="${this.data.logoURL}"></td>
        </tr>
      `);
    }
    if (this.data.title) {
      this.append(`
        <tr>
          <td><h1>${this.data.title}</h1></td>
        </tr>
      `);
    }
    if (this.data.message) {
      this.append(`
        <tr>
          <td><p>${this.data.message}</p></td>
        </tr>
      `);
    }

    if (hasData) {
      this.append(`</table>`);
    }
  }
}
export default Brand

customElements.define('spaaza-brand', Brand);
