import enGB from "../lang/en-GB.json";
import nlNL from "../lang/nl-NL.json";

export interface LangBlock {
	[key: string]: string;
}

export interface LangSubstitutions {
	[search: string]: string;
}

export interface LangStrings {
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

export interface LangJSON extends LangStrings {
	langCode: string;	
}

const stringData: { [lc: string]: LangStrings } = {
	"en-GB": enGB as LangStrings,
	"nl-NL": nlNL as LangStrings
};

type StringTransformer = (s: string, key: string) => string;
type BlockTransformer = (b: LangBlock, key: string) => LangBlock;

/**
 * Maps a user-provided language code to the internal name, defaults to en-GB.
 * @param lang A language identifier
 */
const mapLangCode = (lang: string) => {
	let lc = "en-GB";
	lang = lang.toLowerCase().trim();
	if (lang === "nl" || lang.substr(0, 3) === "nl-" || lang.substr(0, 3) === "nl_") {
		lc = "nl-NL";
	}
	return lc;
};

/**
 * Returns the base strings for a specified language
 * @param lang a string representation a language
 */
const getStrings = (lang: string) => stringData[mapLangCode(lang)] as LangJSON;
export default getStrings;

/**
 * Transform a block of strings using a provided function.
 */
export const transformBlock = (block: LangBlock, fn: StringTransformer) => {
	const res = {} as LangBlock;
	for (const k in block) {
		if (block.hasOwnProperty(k)) {
			res[k] = fn(block[k], k);
		}
	}
	return res;
};

/**
 * Transform all blocks using provided function.
 */
export const transformStringBlocks = (strings: LangStrings, blkFn: BlockTransformer) => {
	const res = {} as LangStrings;
	for (const section in strings) {
		if (strings.hasOwnProperty(section) && typeof (strings as any)[section] === "object") {
			(res as any)[section] = blkFn((strings as any)[section], section);
		}
	}
	return res;
};

/**
 * Transform all strings in all blocks using provided function.
 */
export const transformStrings = (strings: LangStrings, fn: StringTransformer) =>
	transformStringBlocks(strings, (blk, _section) => transformBlock(blk, fn));

/**
 * Replace occurences of multiple substrings in a source string, returning
 * a new string with the applied substitutions.
 * @param {string} string The source string
 * @param {{[search:string]: string}} subst A map whose values will replace the occurences of the keys inside the source string
 */
const substitute = (str: string, subst: LangSubstitutions) => {
	let result = str;
	const regexify = (text: string) => text.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#]/g, s => `\\${s}`);

	for (const k in subst) {
		if (subst.hasOwnProperty(k)) {
			result = result.replace(new RegExp(regexify(k), "g"), subst[k]);
		}
	}
	return result;
};

/**
 * Apply provided substitution map to all strings, returning modified result.
 */
export const applySubstitutions = (strings: LangStrings, subst: LangSubstitutions) =>
	transformStrings(strings, s => substitute(s, subst));

/**
 * Override string replacements in source with overrides returning a new object with the merged result.
 * Will only override existing keys.
 * @returns New object with overrides merged into source
 */
export const overrideStrings = (strings: LangStrings, overrides: LangStrings) =>
	transformStringBlocks(strings, (source, section) => {
		const sectOver = (overrides as any)[section] as LangBlock;
		return transformBlock(source, (srcStr, key) => {
			return (sectOver && key in sectOver) ? sectOver[key] : srcStr;
		});
	});
