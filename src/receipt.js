import parseReceipt from "./data/receiptdata";
import strings, { applySubstitutions, overrideStrings } from "./common/language";
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

	getConfig() {
		const getJSONBlock = (/** @type {string} */type) => {
			const dataNode = this.shadowRoot.host.querySelector(`script[data-${type}]`);
			if (dataNode && dataNode.textContent) {
				try {
					return JSON.parse(dataNode.textContent);
				} catch (err) {
					console.error(`Failed to parse ${type} data: `, err);
				}
			}
			return undefined;
		};

		// get the built-in and user provided strings
		const lang = this.shadowRoot.host.getAttribute("language") || "";
		const langStrings = strings(lang);
		const userStrings = getJSONBlock("strings");
		const combinedStrings = (userStrings) ? overrideStrings(langStrings, userStrings) : langStrings;

		// load receipt and optional language and strings override data
		return {
			langCode: langStrings.langCode,
			receipt: getJSONBlock("receipt"),
			strings: combinedStrings
		};
	}

	redraw() {
		const config = this.getConfig();
		if (config.receipt) {
			const data = parseReceipt(config.receipt);

			const finalStrings = applySubstitutions(config.strings, {
				"$GIVEN_NAME": config.receipt.shopper.first_name,
				"$FAMILY_NAME": config.receipt.shopper.last_name,
				"$CHAIN_NAME": config.receipt.chain.name,
			});

			this.shadowRoot.innerHTML = `<style>${require("./receipt.less")}</style>\n` + renderReceipt(data, finalStrings, config.langCode);
		}
		else {
			this.shadowRoot.innerHTML = ""; // TODO: render error
		}
	}
}

export default Receipt;

customElements.define("spaaza-receipt", Receipt);
