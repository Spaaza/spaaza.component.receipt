import { divider } from '../common/format';

/**
 * Show an error message in case the component cannot render for some reason.
 * @type {Component}
 */
const Error = (data, strings, langCode) => {
	return `
		<div class="spaaza-receipt"><div class="main content">
			<p>${strings.message}</p>
		</div></div>
	`;
	
}

export default Error;
