import { Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface StoreData {
	name: string;
	contact: string;
	email: string;
	website: string;
	address: string;
	postalcode: string;
	city: string;
}

const renderStore = (data: StoreData, strings: LangBlock, langCode: string) => {
	if (! (data.name || data.address || data.postalcode || data.city || data.contact || data.email || data.website)) {
		return null;
	}
	
	return (<table class="receipt-store">
		<tr><td class="align-left">
			{ data.name && <div>{data.name}</div> }
			{ data.address && <div>{data.address}</div> }
			{ (data.postalcode || data.city) && <div>{data.postalcode}, {data.city}</div> }
			{ data.email && <div><a href={"mailto:" + data.email}>{data.email}</a></div> }
			{ data.website && <div><a href={data.website} target="_blank">{data.website}</a></div> }
			{ data.contact && <a href={"tel:" + data.contact}>{data.contact}</a> }
		</td></tr>
	</table>);
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
		city: business.address.towncity,
	}, strings.store, langCode);
};
