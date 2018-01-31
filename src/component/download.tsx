import { Component, h } from "../common/format";
import { RawReceiptData } from "../common/receiptdata";
import { LangBlock, LangStrings } from "../common/language";

interface DownloadData {
	downloadURL?: string;
}

const renderDownload = (data: DownloadData, strings: LangBlock, langCode: string) => {
	if (! data.downloadURL) {
		return null;
	}
	return (<div class="btn-download">
		<a href={data.downloadURL} target="_blank">{strings.label}</a>
	</div>);
};

/**
 * Show a button that lets the user download the receipt as a PDF.
 */
export const Download: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) =>
	renderDownload({
		downloadURL: data.download_url
	}, strings.download, langCode);
