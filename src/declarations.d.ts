declare module "*.less" {
	const content: string;
	export default content;
}

declare module "*.json" {
	const content: any;
	export default content;
}

declare function require(moduleName: string): any;
interface LangBlock {
	[key: string]: string;
}

interface LangSubstitutions {
	[search: string]: string;
}

interface LangStrings {
	brand: LangBlock;
	details: LangBlock;
	lineitems: LangBlock;
	linetaxes: LangBlock;
	totals: LangBlock;
	wallet: LangBlock;
	download: LangBlock;
	store: LangBlock;
	error: LangBlock;
}

interface LangJSON extends LangStrings {
	langCode: string;	
}
