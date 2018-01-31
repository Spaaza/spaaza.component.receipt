import { amount, entities, Component, sumFieldValuesConditional } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData, RawVoucherData } from "../common/receiptdata";

interface TotalsData {
	total: number;
	subtotal: number;
	loyaltyVouchersSpent: number;
	walletVouchersSpent: number;
	basketVouchers: RawVoucherData[];
	currencySymbol: string;
}

const renderTotals = (data: TotalsData, strings: LangBlock) => {
	const { basketVouchers } = data;

	let html = "";
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

/**
 * Shows the totals of the receipt.
 */
export const Totals: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderTotals({
		total: data.total_value,
		subtotal: data.subtotal,
		loyaltyVouchersSpent: sumFieldValuesConditional(data.basket_vouchers, "amount", "type", "loyalty"),
		walletVouchersSpent: sumFieldValuesConditional(data.basket_vouchers, "amount", "type", "wallet"),
		currencySymbol: data.chain.currency_symbol,
		basketVouchers: data.basket_vouchers
	}, strings.totals);
