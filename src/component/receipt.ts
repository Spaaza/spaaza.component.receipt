import { LangStrings, LangBlock } from "../common/language";
import brand from "./brand";
import details from "./details";
import lineitems from "./lineitems";
import linetaxes from "./linetaxes";
import totals from "./totals";
import wallet from "./wallet";
import download from "./download";
import store from "./store";

type Component = (data: any, strings: LangBlock, langCode: string) => string;

/**
 * Render the full receipt with text substitutions.
 * @param {object} data 
 * @param {LangStrings} strings 
 * @param {string} langCode 
 */
const Receipt = (data: any, strings: LangStrings, langCode: string) => {
	const layout = {
		"header": ["brand", "details"],
		"content": ["lineitems", "linetaxes", "totals", "wallet", "pointswallet", "download"],
		"footer": ["store"]
	};
	const components = { brand, details, lineitems, linetaxes, totals, wallet, download, store };

	let result = `<div class="spaaza-receipt"><div class="main content">`;

	for (const section in layout) {
		result += `<section>`;

		for (const componentName of (layout[section] as string[])) {
			// alias pointswallet to wallet
			const component = (componentName === "pointswallet" ? components["wallet"] : components[componentName]) as Component;
			const compStrings = (componentName === "pointswallet" ? strings["wallet"] : strings[componentName]) as LangBlock;
			
			result += component(data[componentName], compStrings, langCode);
		}

		result += `</section>`;
	}

	result += `</div></div>`;
	return result;
};

export default Receipt;
