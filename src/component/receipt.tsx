import { RawReceiptData } from "../common/receiptdata";
import { Component, h } from "../common/format";
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
import { Divider } from "./divider";
import { Note } from "./note";

/**
 * Render the full receipt.
 */
export const Receipt: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => {
	const rc = (c: Component) => c(data, strings, langCode);
	const rcDiv = (c: Component) => {
		const ic = rc(c);
		if (ic) {
			return (<div><Divider />{ic}</div>);
		}
		return ic;
	};
	
	return <div class="main content">
		<section>
			{rc(Brand)}
			{rc(Details)}
		</section>
		<section>
			{rcDiv(LineItems)}
			{rcDiv(Taxes)}
			{rcDiv(Totals)}
			{rcDiv(MonetaryWallet)}
			{rcDiv(PointsWallet)}
			<div class="download">
				<Divider />
				{rc(Download)}
			</div>
		</section>
		<section>
			{rcDiv(Store)}
			{rcDiv(Note)}
			{rc(BarCode)}
		</section>
	</div>;
};
