import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class Download extends Component {

  constructor() {
    super();
  }

  // Called every time the element is inserted into the DOM.
  connectedCallback() {
    this.append(`<style>${require('./download.less')}</style>`);
    this.draw();
  }

  compileTemplate() {
    if (this.data.downloadURL) {
      this.append(divider);
      this.append(`<div class="btn btn-primary"><a href="${this.data.downloadURL}" target="_blank">${this.data.label}</a><div>`);
    }
  }
}
export default Download

customElements.define('spaaza-download', Download);
