/**
 * Format a value as a monetary or points amount.
 */
export const amount = (
	value: number | string,
	currencySymbol: string,
	roundToThree: boolean = false,
) => {
	const isPoints = currencySymbol === "pts";
	let decimals = isPoints ? 0 : 2;

	const decimalCount = value.toString().split(".")[1]?.length || 0;

	if (!isPoints && roundToThree && decimalCount >= 3) {
		decimals = 3;
	}

	const symbolInFront = !isPoints;
	const fmtValue = (+value).toFixed(decimals);
	if (symbolInFront) {
		return `${currencySymbol} ${fmtValue}`;
	}
	return `${fmtValue} ${currencySymbol}`;
};

/**
 * Sum the values of the field in every record in an array
 */
export const sumFieldValues = <T extends object, K extends keyof T>(arr: T[], fieldName: K) =>
	(arr || [])
		.map((i) => i[fieldName])
		.reduce((s, v) => (s as any) + v, 0);

/**
 * Sum the values of the field in every record in an array if another field has a specified value
 */
export const sumFieldValuesConditional = <T extends object, K extends keyof T, K2 extends keyof T>(
	arr: T[],
	fieldName: K,
	ifFieldName: K2,
	isValue: T[K2],
) =>
	(arr || [])
		.filter((i) => i[ifFieldName] === isValue)
		.map((i) => i[fieldName])
		.reduce((s, v) => (s as any) + v, 0);
