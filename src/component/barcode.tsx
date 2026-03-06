import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

// Code 128 binary patterns for values 0-106
// Each string represents modules: '1' = bar, '0' = space
const PATTERNS = [
	"11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
	"10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
	"11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
	"10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
	"11001001110", "11011100100", "11001110100", "11101101110", "11101001100",
	"11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
	"11011011000", "11011000110", "11000110110", "10100011000", "10001011000",
	"10001000110", "10110001000", "10001101000", "10001100010", "11010001000",
	"11000101000", "11000100010", "10110111000", "10110001110", "10001101110",
	"10111011000", "10111000110", "10001110110", "11101110110", "11010001110",
	"11000101110", "11011101000", "11011100010", "11011101110", "11101011000",
	"11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
	"11101111010", "11001000010", "11110001010", "10100110000", "10100001100",
	"10010110000", "10010000110", "10000101100", "10000100110", "10110010000",
	"10110000100", "10011010000", "10011000010", "10000110100", "10000110010",
	"11000010010", "11001010000", "11110111010", "11000010100", "10001111010",
	"10100111100", "10010111100", "10010011110", "10111100100", "10011110100",
	"10011110010", "11110100100", "11110010100", "11110010010", "11011011110",
	"11011110110", "11110110110", "10101111000", "10100011110", "10001011110",
	"10111101000", "10111100010", "11110101000", "11110100010", "10111011110",
	"10111101110", "11101011110", "11110101110",
	"11010000100", // 103: Start A
	"11010010000", // 104: Start B
	"11010011100", // 105: Start C
	"1100011101011", // 106: Stop
];

const START_B = 104;
const STOP = 106;

/**
 * Encode a string as Code 128B and return the binary module pattern.
 */
function encodeCode128(text: string): string {
	const values: number[] = [START_B];

	for (let i = 0; i < text.length; i++) {
		const code = text.charCodeAt(i);
		if (code < 32 || code > 127) {
			continue; // skip unsupported characters
		}
		values.push(code - 32);
	}

	// calculate checksum: start value + sum of (position * value)
	let checksum = values[0];
	for (let i = 1; i < values.length; i++) {
		checksum += i * values[i];
	}
	checksum = checksum % 103;
	values.push(checksum);
	values.push(STOP);

	return values.map(v => PATTERNS[v]).join("");
}

// Dimensions in viewBox units (1 unit = 1 module)
const BAR_HEIGHT = 25;
const QUIET_ZONE = 10;

const renderBarCode = (data: { retailerCode?: string }) => {
	if (!data.retailerCode) {
		return null;
	}

	const modules = encodeCode128(data.retailerCode);
	const barcodeWidth = modules.length;
	const totalWidth = barcodeWidth + QUIET_ZONE * 2;

	// Build bar rectangles (1 unit wide each)
	const bars: JSX.Element[] = [];
	let x = QUIET_ZONE;
	for (let i = 0; i < modules.length; i++) {
		if (modules[i] === "1") {
			bars.push(
				<rect x={String(x)} y="0" width="1" height={String(BAR_HEIGHT)} fill="black" />
			);
		}
		x++;
	}

	const barPixelHeight = BAR_HEIGHT * 2;

	return (
		<div class="content barcode" title={"Barcode: " + data.retailerCode}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 " + totalWidth + " " + BAR_HEIGHT} width="100%" height={String(barPixelHeight)} preserveAspectRatio="none" style={"display:block"}>
				{bars}
			</svg>
			<div class="barcode-label">{data.retailerCode}</div>
		</div>
	);
};

/**
 * Show a barcode for any provided retailer code.
 */
export const BarCode: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBarCode({
		retailerCode: data.retailer_basket_code,
	});
