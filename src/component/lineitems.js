import { amount, divider } from '../common/format';

/**
 * Show the itemized product list.
 * @type {Component}
 */
const LineItems = (data, strings, langCode) => {
	// only when line items collections is available
	if (! (data.lineitems && data.lineitems.length)) {
		return "";
	}
	
	const currencySymbol = data.currencySymbol;
	
	let html = "";
	html += divider;

	// create table header
	html += `
		<table class="receipt-lineitems">
			<tr>
				<th class="align-left">${strings.name}</th>
				<th class="align-center">${strings.quantity}</th>
				<th class="align-right">${strings.price}</th>
			</tr>
	`;

	// create a template for each element
	for (const item of data.lineitems) {
		// check if items needs to show original price
		const isOnSale = item.original_price > item.sale_price;
		html += `
			<tr class="line-item">
				<td class="align-left">
					<div class="line-item-name">${item.name || item.barcode}</div>
				</td>
				<td class="align-center">${item.quantity}</td>
				<td class="align-right">
					<span class="receipt-original-price ${isOnSale?'receipt-line-through':''}">${amount(item.original_price, currencySymbol)}</span>
					<span class="receipt-sale-price receipt-strong">${amount(item.sale_price, currencySymbol)}</span>
				</td>
			</tr>
		`;
	}

	// close table
	html += `</table>`;
	return html;
}

export default LineItems;
