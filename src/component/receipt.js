import ReceiptDataParser from "../data/receiptdataparser.js";
import brand from "./brand";
import details from "./details";
import lineitems from "./lineitems";
import linetaxes from "./linetaxes";
import totals from "./totals";
import wallet from "./wallet";
import download from "./download";
import store from "./store";

const Receipt = (data) => {
	const parser = new ReceiptDataParser(data);
	const layout = {
		"header": ["brand", "details"],
		"content": ["lineitems", "linetaxes", "totals", "wallet", "download"],
		"footer": ["store"]
	};
	const components = { brand, details, lineitems, linetaxes, totals, wallet, download, store };

	let result = `<div class="main content">`;

	for (const section in layout) {
		result += `<section>`;

		for (const component of layout[section]) {
			result += components[component](parser.getDataFor(component));
		}

		result += `</section>`;
	}

	result += `</div>`;
	return result;
}

export default Receipt;
