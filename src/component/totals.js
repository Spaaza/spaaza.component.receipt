import { amount, divider } from '../common/format';

const Totals = (data) => {
	const { strings } = data;
	
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
