import { amount, divider } from '../common/format';

/**
 * Show the wallet mutations if any.
 * @type {Component}
 */
const Wallet = (data, strings, langCode) => {
	const { wallet, vouchers, totalEarned, totalSpent, currencySymbol } = data;
	if (! (totalEarned || totalSpent)) {
		// don't add the wallet section if nothing changed to the wallet
		return "";
	}

	let html = "";
	html += divider;
	html += `<table class="receipt-wallet">`;
	html += `<tr><td class="receipt-strong">${wallet.title}</td></tr>`;
	html += `
		<tr>
			<td>${wallet.title} ${strings.earned}</td>
			<td align="right">${currencySymbol} ${ amount(totalEarned) }</td>
		</tr>
	`;

	if (wallet.contributions.length > 1) {
		for (const contrib of wallet.contributions) {
			html += `
				<tr>
					<td>&nbsp;&nbsp;&nbsp;&nbsp;${contrib.campaign_title}</td>
					<td align="right">${currencySymbol} ${ amount(contrib.amount) }</td>
				</tr>
			`;
		}
	}

	html += `
		<tr>
			<td>${wallet.title} ${strings.spent}</td>
			<td align="right">${currencySymbol} ${ amount(totalSpent) }</td>
		</tr>
		<tr class="receipt-total">
			<td>${strings["new-balance"]}</td>
			<td align="right" class="receipt-strong">${currencySymbol} ${amount(wallet.total)}</td>
		</tr>
	`;

	html += `</table>`;
	return html;
}

export default Wallet;
