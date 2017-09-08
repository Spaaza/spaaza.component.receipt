import { entities, divider } from "../common/format";
import { LangBlock } from "../common/language";

/**
 * Show a button that lets the user download the receipt as a PDF.
 */
const Download = (data: any, strings: LangBlock, langCode: string) => {
	let html = "";
	if (data.downloadURL) {
		html += divider;
		html += `<div class="btn-download"><a href="${entities(data.downloadURL)}" target="_blank">${strings.label}</a><div>`;
	}
	return html;
};

export default Download;
