const sumFieldValues = (arr: any[], fieldName: string) =>
	(arr || [])
	.map(i => i[fieldName])
	.reduce((s, v) => s + v, 0);

const sumFieldValuesConditional = (arr: any[], fieldName: string, ifFieldName: string, isValue: any) =>
	(arr || [])
	.filter(i => i[ifFieldName] === isValue)
	.map(i => i[fieldName])
	.reduce((s, v) => s + v, 0);

/**
 * Parse and transform Spaaza receipts service data into data needed by the receipt subcomponents.
 * @param receipt The receipt data as received from the Spaaza API
 * @returns An object containing data needed for each sub-component
 */
const parseReceipt = (receipt: any) => {
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
			totalEarned: sumFieldValues(receipt.monetary_wallet.contributions, "amount"),
			totalSpent: sumFieldValuesConditional(receipt.basket_vouchers, "amount", "type", "wallet"),
			currencySymbol
		},

		pointswallet: {
			wallet: (receipt.points_wallet) || {},
			totalEarned: (receipt.points_wallet && sumFieldValues(receipt.points_wallet.contributions, "amount")) || 0,
			totalSpent: 0,
			currencySymbol: "pts"
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

		barcode: {
			retailerCode: receipt.retailer_basket_code || ""
		}
	};
};

export default parseReceipt;
