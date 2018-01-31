import { amount, entities, Component } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawLineItemData, RawReceiptData } from "../common/receiptdata";

interface LineItemsData {
	lineitems?: RawLineItemData[];
	currencySymbol: string;
}

const renderLineItems = (data: LineItemsData, strings: LangBlock) => {
	// only when line items collections is available
	if (! (data.lineitems && data.lineitems.length)) {
		return "";
	}
	
	const currencySymbol = data.currencySymbol;
	
	let html = "";

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
					<div class="line-item-name">${entities(item.name || item.barcode)}</div>
				</td>
				<td class="align-center">${entities(item.quantity)}</td>
				<td class="align-right">
					<span class="receipt-original-price ${isOnSale ? "receipt-line-through" : ""}">${amount(item.original_price, currencySymbol)}</span>
					<span class="receipt-sale-price receipt-strong">${amount(item.sale_price, currencySymbol)}</span>
				</td>
			</tr>
		`;
	}

	// close table
	html += `</table>`;
	return html;
};

/**
 * Show the itemized product list.
 */
export const LineItems: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderLineItems({
		lineitems: data.line_items,
		currencySymbol: data.chain.currency_symbol
	}, strings.lineitems);
