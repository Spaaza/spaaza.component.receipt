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
		console.info("WALLET", this.data);
		const { wallet, vouchers } = this.data;
		const currencySymbol = this.data.currencySymbol;
		if (! (wallet && vouchers)) {
			return;
		}

		const sumFieldValues = (arr, fieldName) => {
			return (arr || [])
				.map(i => i[fieldName])
				.reduce((s, v) => s + v, 0);
		};
		const sumFieldValuesConditional = (arr, fieldName, ifFieldName, isValue) => {
			return (arr || [])
				.filter(i => i[ifFieldName] === isValue)
				.map(i => i[fieldName])
				.reduce((s, v) => s + v, 0);
		};

		this.append(divider);
		this.append(`<table class="receipt-wallet">`);
		this.append(`<tr><td class="receipt-strong">${wallet.title}</td></tr>`);
		this.append(`
			<tr>
				<td>${wallet.title} earned</td>
				<td align="right">${currencySymbol}${sumFieldValues(wallet.contributions, "amount")}</td>
			</tr>
		`);

		if (wallet.contributions.length > 1) {
			for (const contrib of wallet.contributions) {
				this.append(`
					<tr>
						<td>&nbsp;&nbsp;&nbsp;&nbsp;${contrib.campaign_title}</td>
						<td align="right">${currencySymbol}${contrib.amount}</td>
					</tr>
				`);
			}
		}

		this.append(`
			<tr>
				<td>${wallet.title} spent</td>
				<td align="right">${currencySymbol}${ sumFieldValuesConditional(vouchers, "amount", "type", "wallet") }</td>
			</tr>
			<tr class="receipt-total">
				<td>Your new balance</td>
				<td align="right" class="receipt-strong">${currencySymbol}${wallet.total}</td>
			</tr>
		`);

		this.append(`</table>`);
	}
}

export default Wallet;

customElements.define('spaaza-wallet', Wallet);
