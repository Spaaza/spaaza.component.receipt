import { amount, Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawPaymentMethodData, RawReceiptData } from "../common/receiptdata";

interface PaymentMethodsData {
	paymentMethods?: RawPaymentMethodData[];
	currencySymbol: string;
}

const renderPaymentMethods = (data: PaymentMethodsData, strings: LangBlock, langCode: string) => {
	if (! (data.paymentMethods && data.paymentMethods.length)) {
		return null;
	}
	const currencySymbol = data.currencySymbol;

	const renderPaymentMethodLine = (paymentMethod: RawPaymentMethodData) => (
		<tr class="payment-method">
			<td class="var-rate align-left">{paymentMethod.payment_method}</td>
			<td class="order-value align-right">{amount(paymentMethod.payment_amount, currencySymbol)}</td>
		</tr>
	);

	return (
		<table class="receipt-paymentmethods">
			{ data.paymentMethods.map(renderPaymentMethodLine) }
		</table>
	);
};

/**
 * Show the itemized payment methods if provided.
 */
export const PaymentMethods: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderPaymentMethods({
		paymentMethods: data.payment_methods,
		currencySymbol: data.currency?.currency_symbol ? data.currency.currency_symbol : data.chain.currency_symbol,
	}, strings.paymentmethods, langCode);
