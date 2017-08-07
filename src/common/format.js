/**
 * Format a value as a monetary amount with 2 decimals.
 * @param {number|string} value 
 * @returns {string} the formatted amount
 */
export function amount(value) {
	return (+value).toFixed(2);
}
