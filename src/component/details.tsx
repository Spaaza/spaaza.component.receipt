import { amount, Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface DetailsData {
	total: number;
	date: string;
	retailerCode?: string;
	currencySymbol: string;
	employeeName: string;
	employeeCode: string;
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

	const employee = data.employeeName ? (
		<tr>
			<td class="">{strings["employee-name"]}</td>
			<td class="align-right">{data.employeeCode}</td>
		</tr>
	) : null;
		
	const date = data.date ? (
		<tr>
			<td class="">{strings.date}</td>
			<td class="align-right">{new Date(data.date).toLocaleString(langCode)}</td>
		</tr>
	) : null;

	return (<table>
		{message}
		{total}
		{order}
		{date}
		{employee}
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
		currencySymbol: data.currency?.currency_symbol ? data.currency.currency_symbol : data.chain.currency_symbol,
		employeeName: data.employee.name,
		employeeCode: data.employee.code
	}, strings.details, langCode);
