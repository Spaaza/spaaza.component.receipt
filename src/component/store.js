import { divider } from '../common/format';

/**
 * Show store contact and address information if available.
 * @type {Component}
 */
const Store = (data, strings, langCode) => {
	if (! (data.name || data.message || data.address || data.contact || data.email || data.website || data.towncity || data.postalcode)) {
		return "";
	}
	
	let html = "";
	html += divider;
	html += `<table class="receipt-store">`;

	html += `
		<tr>
			<td class="align-left">
	`;

	if (data.name) {
		html += `<div>${data.name}</div>`;
	}
	if (data.email) {
		html += `<div><a href="mailto:${data.email}">${data.email}</a></div>`;
	}
	if (data.website) {
		html += `<div><a href="${data.website}" target="_blank">${data.website}</a></div>`;
	}

	html += `
		</td>
		<td class="align-right">
	`;

	if (data.contact) {
		html += `<a href="tel:${data.contact}">${data.contact}</a>`;
	}
	if (data.address) {
		html += `<div>${data.address}</div>`;
	}
	if (data.towncity && data.postalcode) {
		html += `<div>${data.towncity}, ${data.postalcode}</div>`;
	} else if (data.towncity && !data.postalcode) {
		html += `<div>${data.towncity}</div>`;
	} else if (!data.towncity && data.postalcode) {
		html += `<div>${data.postalcode}</div>`;
	}

	html += `
			</td>
		</tr>
	`;

	html += `</table>`;

	if (strings.message) {
		html += divider;
		html += `<p class="receipt-emphasys receipt-footer-message">${strings.message}</p>`;
	}
	return html;
}

export default Store;
