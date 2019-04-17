import { Component, h } from "../common/format";
import { RawReceiptData } from "../common/receiptdata";
import { LangStrings } from "../common/language";

/**
 * Show a button that lets the user download the receipt as a PDF.
 */
export const Download: Component = (data: RawReceiptData, strings: LangStrings, langCode: string) => {
	if (! data.download_url) {
		return null;
	}

	function submit(event: MouseEvent) {
		const receiptElement = (event.target! as Element).closest("div.spaaza-receipt")!;
		const form = (event.target! as Element).parentElement!.querySelector('form')!;
		const content = form.querySelector<HTMLInputElement>('input[name="content"]')!;

		content.value = "";
		content.value = receiptElement.outerHTML;

		form.submit();
		event.preventDefault();
	}

	const actionURL = `${data.download_url}/receipts/print/${data.id}.pdf`;
	return (
		<div class="btn-download">
			<form target="_blank" method="POST" action={actionURL}>
				<input type="hidden" name="content" value="<b>empty</b>" />
			</form>
			<a onClick={submit}>{strings.download.label}</a>
		</div>
	);
};
