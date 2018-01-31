import { Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface BrandData {
	logoURL: string;
}

const renderBrand = (data: BrandData, strings: LangBlock) => {
	return (
		<table>
			{ data.logoURL && <tr><td><img class="brand_logo" src={data.logoURL} /></td></tr> }
			{ strings.title && <tr><td><h1>{strings.title}</h1></td></tr> }
			{ strings.message && <tr><td><p>{strings.message}</p></td></tr> }
		</table>
	);
};

/**
 * Show the chain's logo and receipt header.
 */
export const Brand: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBrand({
		logoURL: data.chain.logo_url
	}, strings.brand);
