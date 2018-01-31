import { entities, Component } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface StoreData {
	name: string;
	contact: string;
	email: string;
	website: string;
	address: string;
	postalcode: string;
	towncity: string;
}

const renderStore = (data: StoreData, strings: LangBlock, langCode: string) => {
	if (! (data.name || data.address || data.contact || data.email || data.website || data.towncity || data.postalcode)) {
		return "";
	}
	
	let html = "";
	html += `<table class="receipt-store">`;

	html += `
		<tr>
			<td class="align-left">
	`;

	if (data.name) {
		html += `<div>${entities(data.name)}</div>`;
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
	if (data.email) {
		html += `<div><a href="mailto:${entities(data.email)}">${entities(data.email)}</a></div>`;
	}
	if (data.website) {
		html += `<div><a href="${entities(data.website)}" target="_blank">${entities(data.website)}</a></div>`;
	}
	if (data.contact) {
		html += `<a href="tel:${entities(data.contact)}">${entities(data.contact)}</a>`;
	}

	html += `
			</td>
		</tr>
	`;

	html += `</table>`;
	return html;
};

/**
 * Show store contact and address information if available.
 */
export const Store: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => {
	const business = data.chain.business;

	return renderStore({
		name: business.name,
		contact: business.phone_number,
		email: business.email,
		website: business.website_url,
		address: `${business.address.address_1} ${business.address.address_2} ${business.address.address_3}`.trim(),
		postalcode: business.address.postal_code,
		towncity: business.address.towncity,
	}, strings.store, langCode);
};
