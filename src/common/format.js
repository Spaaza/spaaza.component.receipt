/**
 * Format a value as a monetary or points amount.
 * @param {number|string} value the amount to format
 * @param {string} currencySymbol
 * @returns {string} the formatted amount
 */
export const amount = (value, currencySymbol) => {
	const isPoints = currencySymbol === "pts";
	const decimals = isPoints ? 0 : 2;
	const symbolInFront = !isPoints;

	const fmtValue = (+value).toFixed(decimals);
	if (symbolInFront) {
		return `${currencySymbol} ${fmtValue}`;
	}
	return `${fmtValue} ${currencySymbol}`;
};

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
