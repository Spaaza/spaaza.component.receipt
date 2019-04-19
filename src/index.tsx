import { RawReceiptData } from "./common/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, LangStrings } from "./common/language";
import { h, renderJSX } from "./common/format";
import { Receipt } from "./component/receipt";
import { ReceiptError } from "./component/error";
import styles from "./receipt.less";
import {installPolyfills} from './common/polyfill';

function getConfig(host: HTMLElement) {
	const getJSONBlock = (type: string) => {
		const dataNode = host.querySelector(`script[data-${type}]`);
		if (dataNode && dataNode.textContent) {
			try {
				return JSON.parse(dataNode.textContent);
			} catch (err) {
				console.warn(`Failed to parse ${type} data: `, err);
			}
		}
		return undefined;
	};

	// get the built-in and user provided strings
	const lang = host.getAttribute("language") || "";
	const langStrings = getStrings(lang);
	const userStrings = getJSONBlock("strings") as LangStrings;
	const combinedStrings = (userStrings) ? overrideStrings(langStrings, userStrings) : langStrings;

	// load receipt data and overrides
	const receipt = getJSONBlock("receipt") as RawReceiptData;
	if (receipt) {
		// override: show monetary wallet value as points?
		const walletPointsRatio = Math.max(0, parseFloat(host.getAttribute("walletpointsratio") || "") || 0);
		receipt.wallet_points_ratio = walletPointsRatio;
		// show custom notes text
		const customNotes = host.getAttribute("customnotes") || "";
		receipt.custom_notes = customNotes;
		//allow developer to change environment, e.g. URL used for barcode
		const environment = host.getAttribute("environment") || "";
		receipt.environment = environment;
		// show or don't show the points block
		//set to true by default
		var showPoints = true;
		if (host.getAttribute("showpoints")) {
			//if the showpoints attribute is included then set the value of showPoints to that
			showPoints = (host.getAttribute("showpoints") === 'true');
		}
		receipt.show_points = showPoints;
	}

	receipt.download_url = host.getAttribute("download-url") || "https://services-prod.spaaza.com";

	return {
		receipt,
		langCode: langStrings.langCode,
		strings: combinedStrings
	};
}

function redraw(host: HTMLElement, root: HTMLElement) {
	const config = getConfig(host);
	let contents: JSX.Element | null;
	if (config.receipt) {
		const finalStrings = applySubstitutions(config.strings, {
			$GIVEN_NAME: config.receipt.shopper.first_name,
			$FAMILY_NAME: config.receipt.shopper.last_name,
			$CHAIN_NAME: config.receipt.chain.name,
		});

		contents = Receipt(config.receipt, finalStrings, config.langCode);
	}
	else {
		console.warn("Could not render receipt", config);			
		contents = ReceiptError({} as RawReceiptData, config.strings, config.langCode);
	}

	root.appendChild(renderJSX(
		<div class="spaaza-receipt">
			<style>{styles}</style>
			{contents}
		</div>
	)!);
}

// ----

function connect(receipt: HTMLElement) {
	if (!receipt.querySelector(".receipt-body")) {
		const rbody = document.createElement("div");
		rbody.className = "receipt-body";
		receipt.appendChild(rbody);
		redraw(receipt, rbody);
	}
}

function init() {
	installPolyfills();

	const receipts: HTMLElement[] = [].slice.call(document.querySelectorAll("spaaza-receipt"), 0);
	for (const receipt of receipts) {
		connect(receipt);
	}

	startObserving();
}

function startObserving() {
	if (! ("MutationObserver" in window)) {
		return;
	}

	const callback = (mutations: MutationRecord[]) => {
		for (const mut of mutations) {
			const newNodes: Node[] = Array.prototype.slice.call(mut.addedNodes, 0);
			for (const n of newNodes) {
				if (n.nodeType === Node.ELEMENT_NODE && n.nodeName.toLowerCase() === "spaaza-receipt") {
					connect(n as HTMLElement);
				}
			}
		}
	};
	const observer = new MutationObserver(callback);
	observer.observe(document, {
		childList: true,
		subtree: true
	});
}

if (document.readyState === "loading") {
	document.addEventListener("readystatechange", () => {
		if (document.readyState !== "loading")
			init();
	})
} else {
	init();
}
