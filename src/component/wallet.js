import { amount, divider } from '../common/format';

const Wallet = (data) => {
	const { wallet, vouchers, strings, currencySymbol } = data;
	if (! (wallet && vouchers)) {
		return "";
	}
	let html = "";
	
	const sumFieldValues = (arr, fieldName) =>
		(arr || [])
			.map(i => i[fieldName])
			.reduce((s, v) => s + v, 0);

	const sumFieldValuesConditional = (arr, fieldName, ifFieldName, isValue) =>
		(arr || [])
			.filter(i => i[ifFieldName] === isValue)
			.map(i => i[fieldName])
			.reduce((s, v) => s + v, 0);

	const totalEarned = sumFieldValues(wallet.contributions, "amount");
	const totalSpent = sumFieldValuesConditional(vouchers, "amount", "type", "wallet");

	if (! (totalEarned || totalSpent)) {
		// don't add the wallet section if nothing changed to the wallet
		return "";
	}

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
