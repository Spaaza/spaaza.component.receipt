/**
 * Code 128B barcode web component, based on https://github.com/oyooyo/barcode-components/
 * Registers <code-128b> custom element.
 */

const CHARACTERS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const START_SYMBOL_ID = 104;
const STOP_SYMBOL_ID = 106;
const QUIET_ZONE_X = 10;

const SYMBOL_PATTERNS = [
	'11011001100', '11001101100', '11001100110', '10010011000',
	'10010001100', '10001001100', '10011001000', '10011000100',
	'10001100100', '11001001000', '11001000100', '11000100100',
	'10110011100', '10011011100', '10011001110', '10111001100',
	'10011101100', '10011100110', '11001110010', '11001011100',
	'11001001110', '11011100100', '11001110100', '11101101110',
	'11101001100', '11100101100', '11100100110', '11101100100',
	'11100110100', '11100110010', '11011011000', '11011000110',
	'11000110110', '10100011000', '10001011000', '10001000110',
	'10110001000', '10001101000', '10001100010', '11010001000',
	'11000101000', '11000100010', '10110111000', '10110001110',
	'10001101110', '10111011000', '10111000110', '10001110110',
	'11101110110', '11010001110', '11000101110', '11011101000',
	'11011100010', '11011101110', '11101011000', '11101000110',
	'11100010110', '11101101000', '11101100010', '11100011010',
	'11101111010', '11001000010', '11110001010', '10100110000',
	'10100001100', '10010110000', '10010000110', '10000101100',
	'10000100110', '10110010000', '10110000100', '10011010000',
	'10011000010', '10000110100', '10000110010', '11000010010',
	'11001010000', '11110111010', '11000010100', '10001111010',
	'10100111100', '10010111100', '10010011110', '10111100100',
	'10011110100', '10011110010', '11110100100', '11110010100',
	'11110010010', '11011011110', '11011110110', '11110110110',
	'10101111000', '10100011110', '10001011110', '10111101000',
	'10111100010', '11110101000', '11110100010', '10111011110',
	'10111101110', '11101011110', '11110101110', '11010000100',
	'11010010000', '11010011100', '1100011101011',
];

const SVG_NS = "http://www.w3.org/2000/svg";

function encode(data: string): string {
	const symbolIds = [START_SYMBOL_ID, ...data.split("").map(c => CHARACTERS.indexOf(c))];
	const checksum = symbolIds.reduce((sum, id, i) => sum + id * Math.max(i, 1), 0) % 103;
	return [...symbolIds, checksum, STOP_SYMBOL_ID].map(id => SYMBOL_PATTERNS[id]).join("");
}

function patternToPathData(pattern: string): string {
	const fragments: string[] = [];
	let lastChar: string | undefined;
	let barStart = 0;
	let offset = 0;
	for (let i = 0; i <= pattern.length; i++) {
		const cur = pattern[i];
		if (cur !== lastChar) {
			if (lastChar === "1") {
				if (offset !== barStart) {
					fragments.push(`m${barStart - offset},0`);
					offset = barStart;
				}
				fragments.push(`v1h${i - barStart}v-1z`);
			} else {
				barStart = i;
			}
			lastChar = cur;
		}
	}
	return fragments.join("");
}

function createSVGElement(name: string, attrs: Record<string, string | number>, ...children: Element[]): Element {
	const el = document.createElementNS(SVG_NS, name);
	for (const [k, v] of Object.entries(attrs)) {
		el.setAttribute(k, String(v));
	}
	for (const child of children) {
		el.appendChild(child);
	}
	return el;
}

function renderBarcode(data: string, height: number): Element {
	const pattern = encode(data);
	const unscaledWidth = pattern.length + QUIET_ZONE_X * 2;

	return createSVGElement("svg",
		{ xmlns: SVG_NS, viewBox: `0 0 ${unscaledWidth} 1`, width: "100%", height, preserveAspectRatio: "none" },
		createSVGElement("rect", { width: unscaledWidth, height: 1, fill: "#fff" }),
		createSVGElement("path", { transform: `translate(${QUIET_ZONE_X},0)`, d: `M0,0${patternToPathData(pattern)}` }),
	);
}

customElements.define("code-128b", class extends HTMLElement {
	static get observedAttributes() {
		return ["data", "height"];
	}

	private _shadow: ShadowRoot;

	constructor() {
		super();
		this._shadow = this.attachShadow({ mode: "open" });
	}

	attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
		if (newValue !== oldValue) {
			this._render();
		}
	}

	private _render() {
		this._shadow.innerHTML = "";
		const data = this.getAttribute("data");
		if (data !== null) {
			const height = parseInt(this.getAttribute("height") || "50", 10) || 50;
			this._shadow.appendChild(renderBarcode(data, height));
		}
	}
});
