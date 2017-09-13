import parseReceipt from "./data/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, transformStrings } from "./common/language";
import { entities } from "./common/format";
import renderReceipt from "./component/receipt";
import renderError from "./component/error";
import styles from "./receipt.less";

export class WebReceipt {
	contents: HTMLDivElement;

	constructor(private host: HTMLElement) {
		this.injectStyles();
		this.contents = document.createElement("div");
		this.contents.className = "spaaza-receipt";
		this.contents.textContent = this.render();
		this.host.appendChild(this.contents);
	}

	injectStyles() {
		if (! document.querySelector("style[data-spaaza-receipt]")) {
			const style = document.createElement("style");
			style.dataset["spaaza-receipt"] = "1";
			style.textContent = styles;
			document.body.appendChild(style);
		}
	}

	getConfig() {
		const getJSONBlock = (type: string) => {
			const dataNode = this.host.querySelector(`script[data-${type}]`);
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
		const lang = this.host.getAttribute("language") || "";
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

	render() {
		const config = this.getConfig();
		let html: string;
		if (config.receipt) {
			const data = parseReceipt(config.receipt);

			const substituted = applySubstitutions(config.strings, {
				"$GIVEN_NAME": config.receipt.shopper.first_name,
				"$FAMILY_NAME": config.receipt.shopper.last_name,
				"$CHAIN_NAME": config.receipt.chain.name,
			});

			const finalStrings = transformStrings(substituted, s => entities(s));

			html = renderReceipt(data, finalStrings, config.langCode);
		}
		else {
			console.warn("Could not draw receipt", config);
			html = renderError({}, config.strings.error, config.langCode);
		}
		return html;
	}
}

export const renderReceipts = () => {
	const rcpts = document.querySelectorAll("spaaza-receipt");
	
};

// customElements.define("spaaza-receipt", Receipt);
