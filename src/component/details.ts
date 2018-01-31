import { amount, entities, Component } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface DetailsData {
	total: number;
	date: string;
	retailerCode?: string;
	currencySymbol: string;
}

const renderDetails = (data: DetailsData, strings: LangBlock, langCode: string) => {
	let html = `<table>`;

	if (strings.message) {
		html += `<tr><td colspan="2">${strings.message}</td></tr>`;
	}

	if (data.total) {
		html += `
			<tr class="receipt-strong">
				<td class="">${strings.charged}</td>
				<td class="align-right">${amount(data.total, data.currencySymbol)}</td>
			</tr>
		`;
	}
	if (data.retailerCode) {
		html += `
			<tr>
				<td class="">${strings["order-number"]}</td>
				<td class="align-right">#${entities(data.retailerCode)}</td>
			</tr>
		`;
	} 
	if (data.date) {
		html += `
			<tr>
				<td class="">${strings.date}</td>
				<td class="align-right">${entities(new Date(data.date).toLocaleString(langCode))}</td>
			</tr>
		`;
	}

	html += `</table>`;
	return html;
};

/**
 * Show an overview of the receipt as a header.
 */
export const Details: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderDetails({
		total: data.total_value,
		date: data.timestamp,
		retailerCode: data.retailer_basket_code,
		currencySymbol: data.chain.currency_symbol
	}, strings.details, langCode);
