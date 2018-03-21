import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface NoteData {
	receiptNote?: string;
}

const renderNote = (data: NoteData) => {
	if (! data.receiptNote) {
		return null;
	}
	return (
		<p class="content note">{data.receiptNote}</p>			
	);
};

/**
 * Show a barcode for any provided retailer code.
 */
export const Note: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderNote({
		receiptNote: data.note
	});
