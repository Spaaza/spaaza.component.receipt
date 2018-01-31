import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

/**
 * Show a horizontal divider.
 */
export const Divider: Component = (data: RawReceiptData, strings: LangStrings) => (
	<table class="divider-wrapper">
		<tr>
			<td class="divider-spacer">
				<table class="divider" cellPadding={0} cellSpacing={0}>
					<tr><td></td></tr>
				</table>
			</td>
		</tr>
	</table>
);
