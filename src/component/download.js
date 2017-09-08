import { entities, divider } from '../common/format';

/**
 * Show a button that lets the user download the receipt as a PDF.
 * @type {Component}
 */
const Download = (data, strings, langCode) => {
	let html = "";
	if (data.downloadURL) {
		html += divider;
		html += `<div class="btn-download"><a href="${entities(data.downloadURL)}" target="_blank">${strings.label}</a><div>`;
	}
	return html;
}

export default Download;
