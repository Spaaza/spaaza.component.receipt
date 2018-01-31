import { amount, Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawLineItemData, RawReceiptData } from "../common/receiptdata";

interface LineItemsData {
	lineitems?: RawLineItemData[];
	currencySymbol: string;
}

const renderLineItems = (data: LineItemsData, strings: LangBlock) => {
	// only when line items collections is available
	if (! (data.lineitems && data.lineitems.length)) {
		return null;
	}
	
	const currencySymbol = data.currencySymbol;
	
	const renderLineItem = (item: RawLineItemData) => {
		// check if items needs to show original price
		const isOnSale = item.original_price > item.sale_price;
		return (
			<tr class="line-item">
				<td class="align-left">
					<div class="line-item-name">{item.name || item.barcode}</div>
				</td>
				<td class="align-center">{item.quantity}</td>
				<td class="align-right">
					<span class={{ "receipt-original-price": true, "receipt-line-through": isOnSale }}>{amount(item.original_price, currencySymbol)}</span>
					<span class="receipt-sale-price receipt-strong">{amount(item.sale_price, currencySymbol)}</span>
				</td>
			</tr>
		);
	};

	// create table header
	return (
		<table class="receipt-lineitems">
			<tr>
				<th class="align-left">{strings.name}</th>
				<th class="align-center">{strings.quantity}</th>
				<th class="align-right">{strings.price}</th>
			</tr>
			{ data.lineitems.map(renderLineItem) }
		</table>
	);
};

/**
 * Show the itemized product list.
 */
export const LineItems: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderLineItems({
		lineitems: data.line_items,
		currencySymbol: data.chain.currency_symbol
	}, strings.lineitems);
