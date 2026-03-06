import { RawReceiptData } from "./common/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, LangStrings } from "./common/language";
import { renderJSX } from "./common/format";
import { Receipt } from "./component/receipt";
import { ReceiptError } from "./component/error";
import styles from "./receipt.less";

class SpaazaReceiptElement extends HTMLElement {
	static get observedAttributes() {
		return ["language", "walletpointsratio", "customnotes", "showpoints"];
	}

	private shadow: ShadowRoot;
	private _receipt: RawReceiptData | null = null;
	private _strings: LangStrings | null = null;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	get receipt(): RawReceiptData | null {
		return this._receipt;
	}

	set receipt(data: RawReceiptData | null) {
		this._receipt = data;
		this.render();
	}

	get strings(): LangStrings | null {
		return this._strings;
	}

	set strings(data: LangStrings | null) {
		this._strings = data;
		this.render();
	}

	connectedCallback() {
		if (!this._receipt) {
			return;
		}
		this.render();
	}

	attributeChangedCallback() {
		if (this._receipt) {
			this.render();
		}
	}

	private render() {
		if (!this.isConnected) {
			return;
		}

		const lang = this.getAttribute("language") || "";
		const langStrings = getStrings(lang);
		const combinedStrings = this._strings ? overrideStrings(langStrings, this._strings) : langStrings;

		const receipt = this._receipt;

		// Clear shadow DOM
		this.shadow.innerHTML = "";

		// Add styles
		const styleEl = document.createElement("style");
		styleEl.textContent = styles;
		this.shadow.appendChild(styleEl);

		// Build content
		let contents: JSX.Element | null;
		if (receipt) {
			receipt.wallet_points_ratio = Math.max(0, parseFloat(this.getAttribute("walletpointsratio") || "") || 0);
			receipt.custom_notes = this.getAttribute("customnotes") || "";
			receipt.show_points = this.getAttribute("showpoints") !== "false";

			let givenName = "";
			let familyName = "";
			if (receipt.user) {
				givenName = receipt.user.firstname;
				familyName = receipt.user.lastname;
			} else if (receipt.shopper) {
				givenName = receipt.shopper.firstname;
				familyName = receipt.shopper.lastname;
			}

			const finalStrings = applySubstitutions(combinedStrings, {
				$GIVEN_NAME: givenName,
				$FAMILY_NAME: familyName,
				$CHAIN_NAME: receipt.chain.name,
			});

			contents = Receipt(receipt, finalStrings, langStrings.langCode);
		} else {
			console.warn("Could not render receipt");
			contents = ReceiptError({} as RawReceiptData, combinedStrings, langStrings.langCode);
		}

		const contentNode = renderJSX(contents!);
		if (contentNode) {
			this.shadow.appendChild(contentNode);
		}
	}
}

customElements.define("spaaza-receipt", SpaazaReceiptElement);
