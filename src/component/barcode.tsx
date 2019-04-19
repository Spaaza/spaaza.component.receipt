import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface BarCodeData {
	retailerCode?: string;
	environment?: string;
}

const renderBarCode = (data: BarCodeData) => {
	if (! data.retailerCode) {
		return null;
	}
	if (data.environment === "staging" || data.environment === "test01" ) {
		return (
			<div class="content barcode">
				<div class="image" title={"Barcode: " + data.retailerCode} style={"background-image: url(https://missetam-test01.spaaza.com/barcode/" + data.retailerCode + ")"}></div>
			</div>
		);
	}
	//in all other cased just return the production URL
	return (
		<div class="content barcode">
			<div class="image" title={"Barcode: " + data.retailerCode} style={"background-image: url(https://acme-prod.spaaza.com/barcode/" + data.retailerCode + ")"}></div>
		</div>
	);
};

/**
 * Show a barcode for any provided retailer code.
 */
export const BarCode: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBarCode({
		retailerCode: data.retailer_basket_code,
		environment: data.environment
	});
