const en = require("../lang/en-GB.json");

export default en;

/**
 * Replace occurences of multiple substrings in a source string, returning
 * a new string with the applied substitutions.
 * @param {string} string The source string
 * @param {{[search:string]: string}} subst A map whose values will replace the occurences of the keys inside the source string
 */
export const substitute = (string, subst) => {
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
 * @param {{[key:string]: string}} strings Map of source strings
 * @param {{[search:string]: string}} subst A map whose values will replace the occurences of the keys inside each source string
 * @returns {{[key:string]: string}} New object with substutions applied to all values
 */
export const blockSubstitute = (strings, subst) => {
	const res = {};
	for (const k in strings) {
		if (strings.hasOwnProperty(k)) {
			res[k] = substitute(strings[k], subst);
		}
	}
	return res;
};
