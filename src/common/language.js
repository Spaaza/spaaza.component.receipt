/**
 * @type {{[langCode: string]: LangJSON}}
 */
const stringData = {
	"en-GB": /** @type{any} */(require("../lang/en-GB.json")),
	"nl-NL": /** @type{any} */(require("../lang/nl-NL.json"))
};

/**
 * Maps a user-provided language code to the internal name, defaults to en-GB.
 * @param {string} lang A language identifier
 */
const mapLangCode = (lang) => {
	let lc = "en-GB";
	lang = lang.toLowerCase().trim();
	if (lang === "nl" || lang.substr(0, 3) === "nl-" || lang.substr(0, 3) === "nl_") {
		lc = "nl-NL";
	}
	return lc;
};

/**
 * Returns the base strings for a specified language
 * @param {string} lang 
 */
const strings = (lang) => stringData[mapLangCode(lang)];
export default strings;

/**
 * Transform a block of strings using a provided function.
 * @param {LangBlock} block 
 * @param {(s: string, k: string)=>string} fn 
 * @returns {LangBlock}
 */
export const transformBlock = (block, fn) => {
	const res = /** @type {LangBlock}*/({});
	for (const k in block) {
		if (block.hasOwnProperty(k)) {
			res[k] = fn(block[k], k);
		}
	}
	return res;
};

/**
 * Transform all blocks using provided function.
 * @param {LangStrings} strings 
 * @param {(b: LangBlock, bk: string)=>LangBlock} blkFn
 */
export const transformStringBlocks = (strings, blkFn) => {
	const res = /** @type {LangStrings} */({});
	for (const section in strings) {
		if (strings.hasOwnProperty(section) && typeof strings[section] === "object") {
			res[section] = blkFn(strings[section], section);
		}
	}
	return res;
}

/**
 * Transform all strings in all blocks using provided function.
 * @param {LangStrings} strings 
 * @param {(s: string, k: string)=>string} fn 
 */
export const transformStrings = (strings, fn) =>
	transformStringBlocks(strings, (blk, section) => transformBlock(blk, fn));

/**
 * Replace occurences of multiple substrings in a source string, returning
 * a new string with the applied substitutions.
 * @param {string} string The source string
 * @param {{[search:string]: string}} subst A map whose values will replace the occurences of the keys inside the source string
 */
const substitute = (string, subst) => {
	let result = string;
	const regexify = (text) => text.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#]/g, s => `\\${s}`);

	for (const k in subst) {
		if (subst.hasOwnProperty(k)) {
			result = result.replace(new RegExp(regexify(k), "g"), subst[k]);
		}
	}
	return result;
};

/**
 * Apply provided substitution map to all strings, returning modified result.
 * @param {LangStrings} strings 
 * @param {LangSubstitutions} subst 
 */
export const applySubstitutions = (strings, subst) =>
	transformStrings(strings, s => substitute(s, subst));

/**
 * Override string replacements in source with overrides returning a new object with the merged result.
 * Will only override existing keys.
 * @param {LangStrings} source 
 * @param {LangStrings} overrides 
 * @returns {LangStrings} New object with overrides merged into source
 */
export const overrideStrings = (strings, overrides) =>
	transformStringBlocks(strings, (source, section) => {
		const sectOver = /** @type {LangBlock} */(overrides[section]);
		return transformBlock(source, (srcStr, key) => {
			return (sectOver && key in sectOver) ? sectOver[key] : srcStr;
		});
	});
