import { entities } from "../common/format";
import { LangBlock } from "../common/language";

/**
 * Show the chain's logo and receipt header.
 * @type {Component}
 */
const Brand = (data: any, strings: LangBlock, langCode: string) => {
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

export default Brand;
