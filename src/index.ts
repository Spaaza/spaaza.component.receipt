import { RawReceiptData } from "./common/receiptdata";
import getStrings, { applySubstitutions, overrideStrings, transformStrings, LangStrings } from "./common/language";
import { entities } from "./common/format";
import { Receipt } from "./component/receipt";
import { ReceiptError } from "./component/error";
import styles from "./receipt.less";

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
	}

	return {
		receipt,
		langCode: langStrings.langCode,
		strings: combinedStrings
	};
}

function redraw(host: HTMLElement, root: HTMLElement) {
	const config = getConfig(host);
	let contents: string;
	if (config.receipt) {
		const substituted = applySubstitutions(config.strings, {
			$GIVEN_NAME: config.receipt.shopper.first_name,
			$FAMILY_NAME: config.receipt.shopper.last_name,
			$CHAIN_NAME: config.receipt.chain.name,
		});
		const finalStrings = transformStrings(substituted, s => entities(s));

		contents = Receipt(config.receipt, finalStrings, config.langCode);
	}
	else {
		console.warn("Could not render receipt", config);			
		contents = ReceiptError({} as RawReceiptData, config.strings, config.langCode);
	}

	root.innerHTML = `<style>${styles}</style>\n<div class="spaaza-receipt">${contents}</div>`;
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

function connectAll() {
	const receipts: HTMLElement[] = [].slice.call(document.querySelectorAll("spaaza-receipt"), 0);
	for (const receipt of receipts) {
		connect(receipt);
	}
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
		if (document.readyState !== "loading") {
			connectAll();
			startObserving();
		}
	});
}
else {
	connectAll();
	startObserving();
}
