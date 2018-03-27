import { amount, Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface DetailsData {
	total: number;
	date: string;
	retailerCode?: string;
	paymentMethod?: string;
	currencySymbol: string;
}

const renderDetails = (data: DetailsData, strings: LangBlock, langCode: string) => {
	const message = strings.message ? <tr><td colSpan={2}>{strings.message}</td></tr> : null;
	const total = data.total ? (
		<tr class="receipt-strong">
			<td class="">{strings.charged}</td>
			<td class="align-right">{amount(data.total, data.currencySymbol)}</td>
		</tr>
	) : null;

	const order = data.retailerCode ? (
		<tr>
			<td class="">{strings["order-number"]}</td>
			<td class="align-right">#{data.retailerCode}</td>
		</tr>
	) : null;
		
	const date = data.date ? (
		<tr>
			<td class="">{strings.date}</td>
			<td class="align-right">{new Date(data.date).toLocaleString(langCode)}</td>
		</tr>
	) : null;

	/*const payment = data.paymentMethod ? (
		<tr>
			<td class="">{strings.payment}</td>
			<td class="align-right">{data.paymentMethod}</td>
		</tr>
	) : null;*/

	return (<table>
		{message}
		{total}
		{order}
		{date}
	</table>);
};

/**
 * Show an overview of the receipt as a header.
 */
export const Details: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderDetails({
		total: data.total_value,
		date: data.timestamp,
		retailerCode: data.retailer_basket_code,
		paymentMethod: data.payment_method,
		currencySymbol: data.chain.currency_symbol
	}, strings.details, langCode);
