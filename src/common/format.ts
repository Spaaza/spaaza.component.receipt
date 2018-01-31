import { RawReceiptData } from "../common/receiptdata";
import { LangStrings } from "./language";

export type Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => string;

/**
 * Format a value as a monetary or points amount.
 * @param value the amount to format
 * @param currencySymbol
 * @returns the formatted amount
 */
export const amount = (value: number | string, currencySymbol: string) => {
	const isPoints = currencySymbol === "pts";
	const decimals = isPoints ? 0 : 2;
	const symbolInFront = !isPoints;

	const fmtValue = (+value).toFixed(decimals);
	if (symbolInFront) {
		return `${currencySymbol} ${fmtValue}`;
	}
	return `${fmtValue} ${currencySymbol}`;
};

/**
 * Make an html-safe representation of a value.
 */
export const entities = (val: string | number) =>
	(val || "").toString().replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/%u/g, "&#x");

/**
 * A divider block
 */
export const divider = `
<table class="divider-wrapper">
	<tr>
		<td class="divider-spacer">
		<table class="divider" cellpadding="0" cellspacing="0">
			<tr><td></td></tr>
		</table>
		</td>
	</tr>
</table>
`;

/**
 * Sum the values of the field in every record in an array
 */
export const sumFieldValues = <T extends object, K extends keyof T>(arr: T[], fieldName: K) =>
	(arr || [])
		.map(i => i[fieldName])
		.reduce((s, v) => s + v, 0);

/**
 * Sum the values of the field in every record in an array if another field has a specified value
 */
export const sumFieldValuesConditional = <T extends object, K extends keyof T, K2 extends keyof T>(arr: T[], fieldName: K, ifFieldName: K2, isValue: T[K2]) =>
	(arr || [])
		.filter(i => i[ifFieldName] === isValue)
		.map(i => i[fieldName])
		.reduce((s, v) => s + v, 0);
