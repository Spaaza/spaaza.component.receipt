import { amount } from '../common/format';
import { divider } from '../common/receipt.layout.js';
import Component from '../common/component.js';

class Wallet extends Component {
	constructor() {
		super();
	}

	// Called every time the element is inserted into the DOM.
	connectedCallback() {
		this.append(`<style>${require('./wallet.less')}</style>`);
		this.draw();
	}

	compileTemplate() {
		const { wallet, vouchers, strings, currencySymbol } = this.data;
		if (! (wallet && vouchers)) {
			return;
		}

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
			return;
		}

		this.append(divider);
		this.append(`<table class="receipt-wallet">`);
		this.append(`<tr><td class="receipt-strong">${wallet.title}</td></tr>`);
		this.append(`
			<tr>
				<td>${wallet.title} ${strings.earned}</td>
				<td align="right">${currencySymbol} ${ amount(totalEarned) }</td>
			</tr>
		`);

		if (wallet.contributions.length > 1) {
			for (const contrib of wallet.contributions) {
				this.append(`
					<tr>
						<td>&nbsp;&nbsp;&nbsp;&nbsp;${contrib.campaign_title}</td>
						<td align="right">${currencySymbol} ${ amount(contrib.amount) }</td>
					</tr>
				`);
			}
		}

		this.append(`
			<tr>
				<td>${wallet.title} ${strings.spent}</td>
				<td align="right">${currencySymbol} ${ amount(totalSpent) }</td>
			</tr>
			<tr class="receipt-total">
				<td>${strings["new-balance"]}</td>
				<td align="right" class="receipt-strong">${currencySymbol} ${amount(wallet.total)}</td>
			</tr>
		`);

		this.append(`</table>`);
	}
}
export default Wallet;

customElements.define('spaaza-wallet', Wallet);
