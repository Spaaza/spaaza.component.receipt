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
