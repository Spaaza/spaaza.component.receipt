import { RawReceiptData } from "../common/receiptdata";
import { LangStrings } from "./language";

export type Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => JSX.Element | null;

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
 * Sum the values of the field in every record in an array
 */
export const sumFieldValues = <T extends object, K extends keyof T>(arr: T[], fieldName: K) =>
	(arr || [])
		.map(i => i[fieldName])
		.reduce((s, v) => (s as any) + v, 0);

/**
 * Sum the values of the field in every record in an array if another field has a specified value
 */
export const sumFieldValuesConditional = <T extends object, K extends keyof T, K2 extends keyof T>(arr: T[], fieldName: K, ifFieldName: K2, isValue: T[K2]) =>
	(arr || [])
		.filter(i => i[ifFieldName] === isValue)
		.map(i => i[fieldName])
		.reduce((s, v) => (s as any) + v, 0);

		
export function h(nodeName: string, attributes: { [k: string]: string; } | null, ...args: any[]): JSX.Element {
	const children = args.length ? ([] as JSX.Element[]).concat(...args) : null;
	return { nodeName, attributes, children };
}

export function renderJSX(vnode: JSX.Element | string | number | null | undefined) {
	if (! vnode) {
		return null;
	}
	if (typeof vnode === "string") {
		// replace unicode char references with actual characters
		const withUnicode = vnode.replace(/%u([0-9a-fA-F]{4})/g, (_, code) => {
			const he = document.createElement("span");
			he.innerHTML = "&#x" + code;
			return he.innerText;
		});

		return document.createTextNode(withUnicode);
	}
	if (typeof vnode === "number") {
		return document.createTextNode(vnode + "");
	}

	const elem = document.createElement(vnode.nodeName);
	if (vnode.attributes) {
		Object.keys(vnode.attributes).forEach(k => {
			const attrVal = vnode.attributes![k];
			if (typeof attrVal === "object") {
				let allBool = true;
				const srlz = Object.keys(attrVal)
				.map(sk => {
					const skv = attrVal[sk];
					if (skv === true) {
						return sk;
					}
					if (skv === false || skv === null || skv === undefined) {
						return undefined;
					}
					allBool = false;
					return sk + ": " + skv;
				})
				.filter(t => !!t)
				.join(allBool ? " " : ", ");
				elem.setAttribute(k, srlz);
			}
			else {
				elem.setAttribute(k, attrVal);
			}
		});
	}
	if (vnode.children) {
		vnode.children.forEach(c => {
			const rc = renderJSX(c);
			if (rc) {
				elem.appendChild(rc);
			}
		});
	}
	return elem;
}
