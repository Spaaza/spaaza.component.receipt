import { amount, entities, divider } from "../common/format";
import { LangBlock } from "../common/language";

/**
 * Shows the totals of the receipt.
 * @type {Component}
 */
const Totals = (data: any, strings: LangBlock, langCode: string) => {
	const { basketVouchers } = data;

	let html = "";
	html += divider;
	html += `<table class="receipt-totals">`;

	if (basketVouchers && basketVouchers.length > 0) {
		for (const vouch of basketVouchers) {
			html += `
				<tr>
					<td>${strings.voucher}: ${entities(vouch.campaign_title)}</td>
					<td align="right" class="voucher">(${ amount(vouch.amount, data.currencySymbol) })</td>
				</tr>
			`;
		}
	}

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
