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
    this.append(`<table>`);
    const data = this.data;
    const { strings } = data;

    if (data.logoURL) {
      this.append(`
        <tr>
          <td><img src="${data.logoURL}"></td>
        </tr>
      `);
    }
    if (strings.title) {
      this.append(`
        <tr>
          <td><h1>${strings.title}</h1></td>
        </tr>
      `);
    }
    if (strings.message) {
      this.append(`
        <tr>
          <td><p>${strings.message}</p></td>
        </tr>
      `);
    }

    this.append(`</table>`);
  }
}
export default Brand;

customElements.define('spaaza-brand', Brand);
