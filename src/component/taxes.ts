import { amount, entities, Component } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawTaxLineData, RawReceiptData } from "../common/receiptdata";

interface TaxesData {
	taxes?: RawTaxLineData[];
	currencySymbol: string;
}

const renderTaxes = (data: TaxesData, strings: LangBlock, langCode: string) => {
	if (! (data.taxes && data.taxes.length)) {
		return "";
	}
	
	const currencySymbol = data.currencySymbol;
	
	let html = "";

	// create table header
	html += `
		<table class="receipt-linetaxes">
			<tr>
				<th class="align-left">${strings["tax-rate"]}</th>
				<th class="align-center">${strings["order-value"]}</th>
				<th class="align-right">${strings["tax-value"]}</th>
			</tr>
	`;

	// create a template for each element
	for (const tax of data.taxes) {
		html += `
			<tr class="tax-line">
				<td class="var-rate align-left">${entities(tax.rate)}%</td>
				<td class="order-value align-center">${amount(tax.order_value, currencySymbol)}</td>
				<td class="vat align-right">${amount(tax.tax_value, currencySymbol)}</td>
			</tr>
		`;
	}

	// close table
	html += `</table>`;
	return html;
};

/**
 * Show the itemized taxes if provided.
 */
export const Taxes: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderTaxes({
		taxes: data.tax_lines,
		currencySymbol: data.chain.currency_symbol
	}, strings.taxes, langCode);
