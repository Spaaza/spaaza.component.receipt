import { amount, Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawTaxLineData, RawReceiptData } from "../common/receiptdata";

interface TaxesData {
	taxes?: RawTaxLineData[];
	currencySymbol: string;
}

const renderTaxes = (data: TaxesData, strings: LangBlock, langCode: string) => {
	if (! (data.taxes && data.taxes.length)) {
		return null;
	}
	const currencySymbol = data.currencySymbol;

	const renderTaxLine = (tax: RawTaxLineData) => (
		<tr class="tax-line">
			<td class="var-rate align-left">{Math.round(tax.rate * 100)}%</td>
			<td class="order-value align-center">{amount(tax.order_value, currencySymbol)}</td>
			<td class="vat align-right">{amount(tax.tax_value, currencySymbol)}</td>
		</tr>
	);

	return (
		<table class="receipt-linetaxes">
			<tr>
				<th class="align-left">{strings["tax-rate"]}</th>
				<th class="align-center">{strings["order-value"]}</th>
				<th class="align-right">{strings["tax-value"]}</th>
			</tr>

			{ data.taxes.map(renderTaxLine) }
		</table>
	);
};

/**
 * Show the itemized taxes if provided.
 */
export const Taxes: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderTaxes({
		taxes: data.tax_lines,
		currencySymbol: data.currency?.currency_symbol ? data.currency.currency_symbol : data.chain.currency_symbol,
	}, strings.taxes, langCode);
