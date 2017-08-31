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
	if (lang === "nl" || lang.substr(0, 3) === "nl-") {
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
 * Apply substitutions to all values of a source object with a common set of search/replace pairs.
 * @param {LangBlock} strings Map of source strings
 * @param {LangSubstitutions} subst A map whose values will replace the occurences of the keys inside each source string
 * @returns {LangBlock} New object with substutions applied to all values
 */
const blockSubstitute = (block, subst) => {
	const res = {};
	for (const k in block) {
		if (block.hasOwnProperty(k)) {
			res[k] = substitute(block[k], subst);
		}
	}
	return res;
};

/**
 * 
 * @param {LangStrings} strings 
 * @param {LangSubstitutions} subst 
 */
export const applySubstitutions = (strings, subst) => {
	const res = {};
	for (const section in strings) {
		if (strings.hasOwnProperty(section) && typeof strings[section] === "object") {
			res[section] = blockSubstitute(strings[section], subst);
		}
	}
	return res;
};

/**
 * Override string replacements in source with overrides returning a new object with the merged result.
 * Will only override existing keys.
 * @param {LangStrings} source 
 * @param {LangStrings} overrides 
 * @returns {LangStrings} New object with overrides merged into source
 */
export const overrideStrings = (source, overrides) => {
	const result = {};

	for (const section in source) {
		if (source.hasOwnProperty(section)) {
			const sectSource = source[section];
			const sectOver = overrides[section];
			const sectResult = result[section] = {};

			for (const key in sectSource) {
				if (sectSource.hasOwnProperty(key)) {
					sectResult[key] = (sectOver && key in sectOver) ? sectOver[key] : sectSource[key];
				}
			}
		}
	}

	return /** @type{LangStrings} */(result);
};
