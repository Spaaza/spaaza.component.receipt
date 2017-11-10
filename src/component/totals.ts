import { amount, divider } from "../common/format";
import { LangBlock } from "../common/language";

/**
 * Shows the totals of the receipt.
 * @type {Component}
 */
const Totals = (data: any, strings: LangBlock, langCode: string) => {
	let html = "";
	html += divider;
	html += `<table class="receipt-totals">`;

	html += `
		<tr class="receipt-subtotal">
			<td>${strings.subtotal}</td>
			<td class="align-right">${amount(data.subtotal, data.currencySymbol)}</td>
		</tr>
	`;

	html += `
		<tr class="receipt-strong">
			<td>${strings.total}</td>
			<td class="align-right">${amount(data.total, data.currencySymbol)}</td>
		</tr>
	`;

	html += `</table>`;
	return html;
};

export default Totals;
