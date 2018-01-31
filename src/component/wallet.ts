import { amount, entities, Component, sumFieldValues, sumFieldValuesConditional } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData, RawWalletData } from "../common/receiptdata";

interface WalletData {
	wallet?: RawWalletData;
	totalEarned: number;
	totalSpent: number;
	currencySymbol: string;
}

const renderWallet = (data: WalletData, strings: LangBlock) => {
	const { wallet, totalEarned, totalSpent, currencySymbol } = data;
	if (! (wallet && (totalEarned || totalSpent))) {
		// don't add a wallet section if it does not exist or if nothing changed
		return "";
	}

	let html = "";
	html += `<table class="receipt-wallet">`;

	html += `<tr><td class="receipt-strong">${entities(wallet.title)}</td></tr>`;

	if (totalEarned) {
		html += `
			<tr>
				<td>${entities(wallet.title)} ${strings.earned}</td>
				<td align="right">${ amount(totalEarned, currencySymbol) }</td>
			</tr>
		`;

		if (wallet.contributions.length > 1) {
			for (const contrib of wallet.contributions) {
				html += `
					<tr>
						<td>&nbsp;&nbsp;&nbsp;&nbsp;${entities(contrib.campaign_title)}</td>
						<td align="right">${ amount(contrib.amount, currencySymbol) }</td>
					</tr>
				`;
			}
		}
	}

	if (totalSpent) {
		html += `
			<tr>
				<td>${entities(wallet.title)} ${strings.spent}</td>
				<td align="right">${ amount(totalSpent, currencySymbol) }</td>
			</tr>
		`;
	}

	html += `
		<tr class="receipt-total">
			<td>${strings["new-balance"]}</td>
			<td align="right" class="receipt-strong">${amount(wallet.total, currencySymbol)}</td>
		</tr>
	`;
	html += `</table>`;

	return html;
};

/**
 * Shows any monetary wallet mutations.
 */
export const MonetaryWallet: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderWallet({
		wallet: data.monetary_wallet,
		totalEarned: sumFieldValues(data.monetary_wallet ? data.monetary_wallet.contributions : [], "amount"),
		totalSpent: sumFieldValuesConditional(data.basket_vouchers, "amount", "type", "wallet"),
		currencySymbol: data.chain.currency_symbol,
	}, strings.wallet);

/**
 * Shows any points wallet mutations.
 */
export const PointsWallet: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderWallet({
		wallet: data.points_wallet,
		totalEarned: (data.points_wallet && sumFieldValues(data.points_wallet.contributions, "amount")) || 0,
		totalSpent: 0,
		currencySymbol: "pts"
	}, strings.wallet);
