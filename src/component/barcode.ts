import { LangBlock } from "../common/language";

/**
 * Show an error message in case the component cannot render for some reason.
 */
const BarCode = (data: any, strings: LangBlock, langCode: string) => {
	if (! data.retailerCode) {
		return ``;
	}
	return `
		<div class="content barcode">
			<div class="image" title="Barcode: ${data.retailerCode}" style="background-image: url(https://missetam.spaaza.com/barcode/${data.retailerCode})"></div>
		</div>
	`;
};

export default BarCode;
