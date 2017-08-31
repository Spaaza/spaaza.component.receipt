import { amount, divider } from '../common/format';

/**
 * Shows the totals of the receipt.
 * @type {Component}
 */
const Totals = (data, strings, langCode) => {
	let html = "";
	html += divider;
	html += `<table class="receipt-totals">`;

	html += `
		<tr class="receipt-subtotal">
			<td>${strings.subtotal}</td>
			<td class="align-right">${data.currencySymbol} ${amount(data.subtotal)}</td>
		</tr>
	`;

	html += `
		<tr class="receipt-strong">
			<td>${strings.total}</td>
			<td class="align-right">${data.currencySymbol} ${amount(data.total)}</td>
		</tr>
	`;

	html += `</table>`;
	return html;
}

export default Totals;
