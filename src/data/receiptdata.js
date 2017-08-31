const sumFieldValues = (arr, fieldName) =>
	(arr || [])
	.map(i => i[fieldName])
	.reduce((s, v) => s + v, 0);

const sumFieldValuesConditional = (arr, fieldName, ifFieldName, isValue) =>
	(arr || [])
	.filter(i => i[ifFieldName] === isValue)
	.map(i => i[fieldName])
	.reduce((s, v) => s + v, 0);

/**
 * Parse and transform Spaaza receipts service data into data needed by the receipt subcomponents.
 * @param {any} receipt The receipt data as received from the Spaaza API
 * @returns {any} An object containing data needed for each sub-component
 */
const parseReceipt = (receipt) => {
	const { shopper, chain } = receipt;
	const { currency_symbol: currencySymbol, business } = chain;

	// define data object for a component
	return {
		brand: {
			logoURL: chain.logo_url
		},

		details: {
			name: chain.id,
			id: receipt.id,
			total: receipt.total_value,
			date: receipt.timestamp,
			currencySymbol
		},

		lineitems: {
			lineitems: receipt.line_items,
			currencySymbol
		},

		linetaxes: {
			linetaxes: receipt.tax_lines,
			currencySymbol
		},

		totals: {
			total: receipt.total_value,
			subtotal: receipt.subtotal,
			currencySymbol
		},

		download: {
			downloadURL: receipt.download_url,
		},

		wallet: {
			wallet: receipt.monetary_wallet,
			vouchers: receipt.basket_vouchers,
			totalEarned: sumFieldValues(receipt.monetary_wallet.contributions, "amount"),
			totalSpent: sumFieldValuesConditional(receipt.basket_vouchers, "amount", "type", "wallet"),
			currencySymbol
		},

		store: {
			name: business.name,
			contact: business.phone_number,
			email: business.email,
			website: business.website_url,
			address: `${business.address.address_1} ${business.address.address_2} ${business.address.address_3}`.trim(),
			postalcode: business.address.postal_code,
			towncity: business.address.towncity,
		},
	};
}

export default parseReceipt;
