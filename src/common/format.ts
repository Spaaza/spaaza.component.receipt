import { RawReceiptData } from "../common/receiptdata";
import { LangStrings } from "./language";

export type Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => JSX.Element | null;
export type ValueComponent = (props: {}) => JSX.Element;

/**
 * Format a value as a monetary or points amount.
 * @param value the amount to format
 * @param currencySymbol
 * @returns the formatted amount
 */
export const amount = (
	value: number | string,
	currencySymbol: string,
	roundToThree: boolean = false // Optional parameter with default value false
  ) => {
	const isPoints = currencySymbol === "pts";
	// Default decimals is 2 unless it's points, then it's 0.
	let decimals = isPoints ? 0 : 2;
  
	// Determine the number of decimal places in the value
	const decimalCount = value.toString().split('.')[1]?.length || 0;
  
	// If roundToThree is true and there are 3 or more decimal places, use 3 decimals
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


export function h(node: string | ValueComponent, attributes: { [k: string]: string; } | null, ...args: any[]): JSX.Element {

	const children = args.length ? ([] as JSX.Element[]).concat(...args) : null;

	if (typeof node === "string") {
		return { nodeName: node, attributes, children };
	}

	// else ValueComponent
	const props: any = attributes;
	if(children)
		props.children = children;
	return node(props)
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

			// event handler, onClick, etc...
			if (typeof attrVal === "function") {
				const eventName = k.substr(2).toLowerCase();
				elem.addEventListener(eventName, attrVal as EventListener);
				return;
			}

			// do something weird with objects (why?)
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
				return;
			}

			// normal string attributes
			if (typeof attrVal === "string") {
				elem.setAttribute(k, attrVal);
				return;
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
