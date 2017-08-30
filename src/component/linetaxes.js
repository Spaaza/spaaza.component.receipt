import { amount, divider } from '../common/format';

const LineTaxes = (data) => {
	if (! (data.linetaxes && data.linetaxes.length)) {
		return "";
	}
	
	const currencySymbol = data.currencySymbol;
	const strings = data.strings;
	
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
				<td class="var-rate align-left">${tax.rate}%</td>
				<td class="order-value align-center">${currencySymbol} ${amount(tax.order_value)}</td>
				<td class="vat align-right">${currencySymbol} ${amount(tax.tax_value)}</td>
			</tr>
		`;
	}

	// close table
	html += `</table>`;
	return html;
}

export default LineTaxes;
