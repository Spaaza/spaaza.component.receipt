import { Component } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface BarCodeData {
	retailerCode?: string;
}

const renderBarCode = (data: BarCodeData) => {
	if (! data.retailerCode) {
		return ``;
	}
	return `
		<div class="content barcode">
			<div class="image" title="Barcode: ${data.retailerCode}" style="background-image: url(https://missetam.spaaza.com/barcode/${data.retailerCode})"></div>
		</div>
	`;
};

/**
 * Show a barcode for any provided retailer code.
 */
export const BarCode: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBarCode({
		retailerCode: data.retailer_basket_code
	});
