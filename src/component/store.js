import { entities, divider } from '../common/format';

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
		html += `<div>${entities(data.name)}</div>`;
	}
	if (data.email) {
		html += `<div><a href="mailto:${entities(data.email)}">${entities(data.email)}</a></div>`;
	}
	if (data.website) {
		html += `<div><a href="${entities(data.website)}" target="_blank">${entities(data.website)}</a></div>`;
	}

	html += `
		</td>
		<td class="align-right">
	`;

	if (data.contact) {
		html += `<a href="tel:${entities(data.contact)}">${entities(data.contact)}</a>`;
	}
	if (data.address) {
		html += `<div>${entities(data.address)}</div>`;
	}
	if (data.towncity && data.postalcode) {
		html += `<div>${entities(data.towncity)}, ${entities(data.postalcode)}</div>`;
	} else if (data.towncity && !data.postalcode) {
		html += `<div>${entities(data.towncity)}</div>`;
	} else if (!data.towncity && data.postalcode) {
		html += `<div>${entities(data.postalcode)}</div>`;
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
