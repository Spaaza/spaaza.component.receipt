import { Component, h } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData, RawUserData } from "../common/receiptdata";

interface BrandData {
	logoURL: string;
	user?: RawUserData;
	shopper?: RawUserData;
}

const renderBrand = (data: BrandData, strings: LangBlock) => {
	return (
		<table>
			{ data.logoURL && <tr><td><img class="brand_logo" src={data.logoURL} /></td></tr> }
			{ strings.title && <tr><td><h1>{strings.title}</h1></td></tr> }
			{ strings.message && (data.user?.id || data.shopper?.id) && <tr><td><p>{strings.message}</p></td></tr> }
		</table>
	);
};

/**
 * Show the chain's logo and receipt header.
 */
export const Brand: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderBrand({
		logoURL: data.chain.logo_url,
		shopper: data.shopper,
		user: data.user
	}, strings.brand);
