import { LangBlock } from "../common/language";

/**
 * Show an error message in case the component cannot render for some reason.
 */
const Error = (data: any, strings: LangBlock, langCode: string) => {
	return `
		<div class="spaaza-receipt"><div class="main content">
			<p>${strings.message}</p>
		</div></div>
	`;
};

export default Error;
