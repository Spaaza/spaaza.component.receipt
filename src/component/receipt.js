import brand from "./brand";
import details from "./details";
import lineitems from "./lineitems";
import linetaxes from "./linetaxes";
import totals from "./totals";
import wallet from "./wallet";
import download from "./download";
import store from "./store";

/**
 * Render the full receipt with text substitutions.
 * @param {object} data 
 * @param {LangStrings} strings 
 * @param {string} langCode 
 */
const Receipt = (data, strings, langCode) => {
	const layout = {
		"header": ["brand", "details"],
		"content": ["lineitems", "linetaxes", "totals", "wallet", "pointswallet", "download"],
		"footer": ["store"]
	};
	const components = { brand, details, lineitems, linetaxes, totals, wallet, download, store };

	let result = `<div class="spaaza-receipt"><div class="main content">`;

	for (const section in layout) {
		result += `<section>`;

		for (const componentName of layout[section]) {
			// alias pointswallet to wallet
			const component = /** @type {Component}*/(componentName === "pointswallet" ? components["wallet"] : components[componentName]);
			const compStrings = /** @type {LangBlock}*/(componentName === "pointswallet" ? strings["wallet"] : strings[componentName]);
			
			result += component(data[componentName], compStrings, langCode);
		}

		result += `</section>`;
	}

	result += `</div></div>`;
	return result;
}

export default Receipt;
