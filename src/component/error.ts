import { Component } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

/**
 * Show an error message in case the component cannot render for some reason.
 */
export const ReceiptError: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => {
	return `
		<div class="main content">
			<p>${strings.error.message}</p>
		</div>
	`;
};
