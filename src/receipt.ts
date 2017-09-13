import parseReceipt from "./data/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, transformStrings } from "./common/language";
import { entities } from "./common/format";
import renderReceipt from "./component/receipt";
import renderError from "./component/error";
import styles from "./receipt.less";

class Receipt extends HTMLElement {
	// Monitor the 'redraw' attribute for changes.
	static get observedAttributes() { return ["language", "redraw"]; }
	private root: ShadowRoot;
	private connected: boolean;

	constructor() {
		super();
		this.root = this.attachShadow({ mode: "open" });
		this.connected = false;
	}

	private connect() {
		this.redraw();
		this.connected = true;
	}

	connectedCallback() {
		document.addEventListener("readystatechange", () => {
			if (document.readyState !== "loading") {
				this.connect();
			}
		});
	}

	attributeChangedCallback(attr: Attr, oldVal: string, newVal: string) {
		if (this.connected) {
			this.redraw();
		}
	}

	getConfig() {
		const getJSONBlock = (type: string) => {
			const dataNode = this.root.host.querySelector(`script[data-${type}]`);
			if (dataNode && dataNode.textContent) {
				try {
					return JSON.parse(dataNode.textContent);
				} catch (err) {
					console.warn(`Failed to parse ${type} data: `, err);
				}
			}
			return undefined;
		};

		// get the built-in and user provided strings
		const lang = this.root.host.getAttribute("language") || "";
		const langStrings = getStrings(lang);
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
		let contents: string;
		if (config.receipt) {
			const data = parseReceipt(config.receipt);

			const substituted = applySubstitutions(config.strings, {
				"$GIVEN_NAME": config.receipt.shopper.first_name,
				"$FAMILY_NAME": config.receipt.shopper.last_name,
				"$CHAIN_NAME": config.receipt.chain.name,
			});
			const finalStrings = transformStrings(substituted, s => entities(s));

			contents = renderReceipt(data, finalStrings, config.langCode);
		}
		else {
			console.warn("Could not draw receipt", config);			
			contents = renderError({}, config.strings.error, config.langCode);
		}

		this.root.innerHTML = `<style>${styles}</style>\n<div class="spaaza-receipt">${contents}</div>`;
	}
}

export default Receipt;

customElements.define("spaaza-receipt", Receipt);
