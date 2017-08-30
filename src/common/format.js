/**
 * Format a value as a monetary amount with 2 decimals.
 * @param {number|string} value 
 * @returns {string} the formatted amount
 */
export function amount(value) {
	return (+value).toFixed(2);
}

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
