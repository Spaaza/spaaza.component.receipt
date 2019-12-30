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
		let target = (event.target! as Element).parentElement!;

		target.innerHTML = `Generating Receipt...`;
		fetch(`${data.download_url}/export/pdf`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"name": "receipt",
				"content": target.closest("div.spaaza-receipt")!.outerHTML,
			})
		}).then(r => {
			if(! r.headers.get("Location")) {
				throw new Error("Missing Location header");
			}
			target.innerHTML = `Opening Receipt...`;
			window.location.href = new URL(r.headers.get("Location")!, data.download_url).href;
		}).catch(err => {
			target.innerHTML = `<i style="color: red">Failed to create PDF: ${err}</i>`
		})
	}

	return (
		<div class="btn-download">
			<a onClick={submit}>{strings.download.label}</a>
		</div>
	);
};
