import { amount, entities, divider } from '../common/format';

/**
 * Show the itemized taxes if provided.
 * @type {Component}
 */
const LineTaxes = (data, strings, langCode) => {
	if (! (data.linetaxes && data.linetaxes.length)) {
		return "";
	}
	
	const currencySymbol = data.currencySymbol;
	
	let html = "";
	html += divider;

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
	for (const tax of data.linetaxes) {
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
}

export default LineTaxes;
