import parseReceipt from "./data/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, transformStrings } from "./common/language";
import { entities } from "./common/format";
import renderReceipt from "./component/receipt";
import renderError from "./component/error";
import styles from "./receipt.less";

function connectAll() {
	const receipts: HTMLElement[] = [].slice.call(document.querySelectorAll("spaaza-receipt"), 0);
	for (const receipt of receipts) {
		if (! receipt.querySelector(".receipt-body")) {
			const rbody = document.createElement("div");
			rbody.className = "receipt-body";
			receipt.appendChild(rbody);
			redraw(receipt, rbody);
		}
	}
}

function getConfig(host: HTMLElement) {
	const getJSONBlock = (type: string) => {
		const dataNode = host.querySelector(`script[data-${type}]`);
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
	const lang = host.getAttribute("language") || "";
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

function redraw(host: HTMLElement, root: HTMLElement) {
	const config = getConfig(host);
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

	root.innerHTML = `<style>${styles}</style>\n<div class="spaaza-receipt">${contents}</div>`;
}


if (document.readyState !== "complete") {
	document.addEventListener("readystatechange", () => {
		if (document.readyState === "complete") {
			connectAll();
		}
	});
}
else {
	connectAll();
}
