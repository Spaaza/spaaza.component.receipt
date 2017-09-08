import { amount, entities, divider } from '../common/format';

/**
 * Show wallet mutations if any.
 * @type {Component}
 */
const Wallet = (data, strings, langCode) => {
	const { wallet, totalEarned, totalSpent, currencySymbol } = data;
	if (! (totalEarned || totalSpent)) {
		// don't add a wallet section if nothing changed
		return "";
	}

	let html = "";

	html += divider;
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
}

export default Wallet;
