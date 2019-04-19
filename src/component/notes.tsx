import { Component, h } from "../common/format";
import { LangStrings } from "../common/language";
import { RawReceiptData } from "../common/receiptdata";

interface NotesData {
	notes?: string;
	customNotes?: string;
}

const renderNotes = (data: NotesData) => {
	if (! data.notes && ! data.customNotes) {
		return null;
	}

	const renderCustomNote = () => {
		if (! data.customNotes) {
			return null;
		}
		return (
			<p>{data.customNotes}</p>
		);
	};	

	const renderDefaultNote = () => {
		//only render the "default" note returned by API if there is no custom note
		if (! data.notes || data.customNotes) {
			return null;
		}
		return (
			<p>{data.notes}</p>
		);
	};	

	return (
		<div class="receipt-notes">
			{renderCustomNote()}
			{renderDefaultNote()}
		</div>				
	);
};

/**
 * Show the notes for the receipt.
 */
export const Notes: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderNotes({
		notes: data.notes,
		customNotes: data.custom_notes
	});
