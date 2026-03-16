import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";
import "../vendor/barcode-code128b";

const renderBarCode = (data: { retailerCode?: string }) => {
	if (!data.retailerCode) {
		return null;
	}

	return (
		<div class="content barcode" title={"Barcode: " + data.retailerCode}>
			<code-128b data={data.retailerCode} height="50"></code-128b>
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
