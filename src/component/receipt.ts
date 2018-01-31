import { RawReceiptData } from "../common/receiptdata";
import { Component, divider } from "../common/format";
import { LangStrings } from "../common/language";

import { Brand } from "./brand";
import { Details } from "./details";
import { LineItems } from "./lineitems";
import { Taxes } from "./taxes";
import { Totals } from "./totals";
import { MonetaryWallet, PointsWallet } from "./wallet";
import { Download } from "./download";
import { Store } from "./store";
import { BarCode } from "./barcode";

/**
 * Render the full receipt.
 */
export const Receipt: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => {
	const rc = (c: Component) => c(data, strings, langCode);
	const rcDiv = (c: Component) => {
		let html = rc(c);
		if (html.length) {
			html = divider + html; 
		}
		return html;
	};
	
	return `<div class="main content">
		<section>
			${rc(Brand)}
			${rc(Details)}
		</section>
		<section>
			${rcDiv(LineItems)}
			${rcDiv(Taxes)}
			${rcDiv(Totals)}
			${rcDiv(MonetaryWallet)}
			${rcDiv(PointsWallet)}
			${rcDiv(Download)}
		</section>
		<section>
			${rcDiv(Store)}
			${rc(BarCode)}
		</section>
	</div>`;
};
