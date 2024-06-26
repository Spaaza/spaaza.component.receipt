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
		const isOnSale = Math.abs(item.original_price) > Math.abs(item.sale_price);
		return (
			<tr class="line-item">
				<td class="align-left receipt-name" >
					{item.name && <strong>{item.name}</strong>}
					<div>{item.barcode}</div>
				</td>
				<td class="align-right receipt-quantity" >{item.quantity}{item.quantity_unit !== "item" ? item.quantity_unit : null}</td>
				<td class="align-right receipt-price">
					<div class={{ "receipt-original-price": true, "receipt-line-through": isOnSale }}>{amount(item.original_price, currencySymbol, true)}</div>
					<div class="receipt-sale-price">{amount(item.sale_price, currencySymbol, true)}</div>
				</td>
				<td class="align-right receipt-price">
					<div class="receipt-sale-price receipt-strong">{amount(item.sale_price * item.quantity, currencySymbol)}</div>
				</td>
			</tr>
		);
	};

	// create table header
	return (
		<table class="receipt-lineitems">
			<tr>
				<th class="align-left receipt-name">{strings.name}</th>
				<th class="align-right receipt-quantity">{strings.quantity}</th>
				<th class="align-right receipt-price">{strings.price}</th>
				<th class="align-right receipt-line-total">{strings["line-total"]}</th>
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
		currencySymbol: data.currency?.currency_symbol ? data.currency.currency_symbol : data.chain.currency_symbol,
	}, strings.lineitems);
