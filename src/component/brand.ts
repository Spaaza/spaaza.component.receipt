import { Component, entities } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface BrandData {
	logoURL: string;
}

const renderBrand = (data: BrandData, strings: LangBlock) => {
	let html = `<table>`;

	if (data.logoURL) {
		html += `
			<tr>
				<td><img class="brand_logo" src="${entities(data.logoURL)}"></td>
			</tr>
		`;
	}
	if (strings.title) {
		html += `
			<tr>
				<td><h1>${strings.title}</h1></td>
			</tr>
		`;
	}
	if (strings.message) {
		html += `
			<tr>
				<td><p>${strings.message}</p></td>
			</tr>
		`;
	}

	html += `</table>`;
	return html;
};

/**
 * Show the chain's logo and receipt header.
 */
export const Brand: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBrand({
		logoURL: data.chain.logo_url
	}, strings.brand);
