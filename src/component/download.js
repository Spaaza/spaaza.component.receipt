import { divider } from '../common/format';

const Download = (data) => {
	const { strings } = data;

	let html = "";
	if (data.downloadURL) {
		html += divider;
		html += `<div class="btn-download"><a href="${data.downloadURL}" target="_blank">${strings.label}</a><div>`;
	}
	return html;
}

export default Download;
