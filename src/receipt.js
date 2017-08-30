import renderReceipt from "./component/receipt";

class Receipt extends HTMLElement {
	// Monitor the 'redraw' attribute for changes.
	static get observedAttributes() { return ['redraw']; }

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	// Called every time the element is inserted into the DOM.
	connectedCallback() {
		this.redraw();
	}

	// The behavior occurs when an attribute of the element is added, removed, updated, or replaced.
	attributeChangedCallback(attr, oldVal, newVal) {
		if (attr === 'redraw') {
			this.redraw();
		}
	}

	getData() {
		// get data from embedded data element
		const dataNode = this.shadowRoot.host.querySelector('script');
		if (dataNode && dataNode.textContent) {
			try {
				return JSON.parse(dataNode.textContent);
			} catch (err) {
				console.error("Failed to parse receipt data: ", err);
			}
		}
		else {
			console.error("No receipt data provided.");
		}
		return null;
	}

	redraw() {
		const data = this.getData();
		if (data) {
			this.shadowRoot.innerHTML = `<style>${require("./receipt.less")}</style>\n` + renderReceipt(data);
		}
		else {
			this.shadowRoot.innerHTML = ""; // TODO: render error
		}
	}
}

export default Receipt;

customElements.define("spaaza-receipt", Receipt);
