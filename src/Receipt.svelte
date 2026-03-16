<svelte:options customElement={{
	tag: "spaaza-receipt",
	shadow: "open",
	props: {
		receipt: { reflect: false, type: "Object" },
		strings: { reflect: false, type: "Object" },
		language: { reflect: true, type: "String" },
		walletpointsratio: { reflect: true, type: "String" },
		customnotes: { reflect: true, type: "String" },
		showpoints: { reflect: true, type: "String" },
	},
}} />

<script lang="ts">
	import type { RawReceiptData } from "./common/receiptdata";
	import type { LangStrings } from "./common/language";
	import getStrings, { applySubstitutions, overrideStrings } from "./common/language";
	import { sumFieldValues, sumFieldValuesConditional } from "./common/format";

	import Brand from "./component/Brand.svelte";
	import Details from "./component/Details.svelte";
	import LineItems from "./component/LineItems.svelte";
	import Taxes from "./component/Taxes.svelte";
	import Totals from "./component/Totals.svelte";
	import PaymentMethods from "./component/PaymentMethods.svelte";
	import Wallet from "./component/Wallet.svelte";
	import Store from "./component/Store.svelte";
	import Notes from "./component/Notes.svelte";
	import BarCode from "./component/BarCode.svelte";
	import Divider from "./component/Divider.svelte";

	let {
		receipt = null,
		strings: customStrings = null,
		language = "",
		walletpointsratio = "",
		customnotes = "",
		showpoints = "true",
	}: {
		receipt: RawReceiptData | null;
		strings: LangStrings | null;
		language: string;
		walletpointsratio: string;
		customnotes: string;
		showpoints: string;
	} = $props();

	let langStrings = $derived(getStrings(language || ""));
	let langCode = $derived(langStrings.langCode);
	let combinedStrings = $derived(
		customStrings ? overrideStrings(langStrings, customStrings) : langStrings,
	);

	let givenName = $derived(receipt?.user?.firstname ?? receipt?.shopper?.firstname ?? "");
	let familyName = $derived(receipt?.user?.lastname ?? receipt?.shopper?.lastname ?? "");
	let finalStrings = $derived(
		applySubstitutions(combinedStrings, {
			$GIVEN_NAME: givenName,
			$FAMILY_NAME: familyName,
			$CHAIN_NAME: receipt?.chain?.name ?? "",
		}),
	);

	let walletRatio = $derived(Math.max(0, parseFloat(walletpointsratio) || 0));
	let showPointsBool = $derived(showpoints !== "false");

	let currencySymbol = $derived(
		receipt?.currency?.currency_symbol ?? receipt?.chain?.currency_symbol ?? "",
	);

	function applyRatio(value: number, ratio: number): number {
		return ratio > 0 ? Math.round(value * ratio) : value;
	}

	let monetaryWallet = $derived.by(() => {
		if (!receipt?.monetary_wallet) return null;
		const mw = receipt.monetary_wallet;
		const totalEarned = applyRatio(
			sumFieldValues(mw.contributions, "amount"),
			walletRatio,
		);
		const totalSpent = applyRatio(
			sumFieldValuesConditional(receipt.basket_vouchers, "amount", "type", "wallet"),
			walletRatio,
		);
		if (!(totalEarned || totalSpent)) return null;
		return {
			wallet: {
				title: mw.title,
				total: applyRatio(mw.total, walletRatio),
				contributions: mw.contributions.map((c) => ({
					campaign_title: c.campaign_title,
					amount: applyRatio(c.amount, walletRatio),
				})),
			},
			totalEarned,
			totalSpent,
			currencySymbol: walletRatio > 0 ? "" : receipt.chain.currency_symbol,
		};
	});

	let pointsWallet = $derived.by(() => {
		if (!receipt?.points_wallet || !showPointsBool) return null;
		const pw = receipt.points_wallet;
		const totalEarned = sumFieldValues(pw.contributions, "amount") || 0;
		if (!totalEarned) return null;
		return {
			wallet: pw,
			totalEarned,
			totalSpent: 0,
			currencySymbol: "",
		};
	});
</script>

{#if receipt}
	<div class="main content">
		<section>
			<Brand
				logoURL={receipt.chain.logo_url}
				user={receipt.user}
				shopper={receipt.shopper}
				strings={finalStrings.brand}
			/>
			<Details
				total={receipt.total_value}
				date={receipt.timestamp}
				retailerCode={receipt.retailer_basket_code}
				{currencySymbol}
				employeeName={receipt.employee.name}
				employeeCode={receipt.employee.code}
				strings={finalStrings.details}
				{langCode}
			/>
		</section>
		<section>
			{#if receipt.line_items?.length}
				<Divider />
				<LineItems items={receipt.line_items} {currencySymbol} strings={finalStrings.lineitems} />
			{/if}
			{#if receipt.tax_lines?.length}
				<Divider />
				<Taxes taxes={receipt.tax_lines} {currencySymbol} strings={finalStrings.taxes} />
			{/if}
			<Divider />
			<Totals
				total={receipt.total_value}
				subtotal={receipt.subtotal}
				basketVouchers={receipt.basket_vouchers}
				{currencySymbol}
				strings={finalStrings.totals}
			/>
			{#if receipt.payment_methods?.length}
				<PaymentMethods
					methods={receipt.payment_methods}
					{currencySymbol}
					strings={finalStrings.paymentmethods}
				/>
			{/if}
			{#if monetaryWallet}
				<Divider />
				<Wallet {...monetaryWallet} strings={finalStrings.wallet} />
			{/if}
			{#if pointsWallet}
				<Divider />
				<Wallet {...pointsWallet} strings={finalStrings.wallet} />
			{/if}
		</section>
		<section>
			{#if receipt.chain.business}
				<Divider />
				<Store business={receipt.chain.business} strings={finalStrings.store} />
			{/if}
			{#if receipt.notes || customnotes || receipt.custom_notes}
				<Divider />
				<Notes notes={receipt.notes} customNotes={customnotes || receipt.custom_notes} />
			{/if}
			{#if receipt.retailer_basket_code}
				<BarCode code={receipt.retailer_basket_code} />
			{/if}
		</section>
	</div>
{:else}
	<div class="main content">
		<p>{finalStrings.error.message}</p>
	</div>
{/if}

<style>
	/* Global resets and shared styles for the shadow DOM */
	:global {
		:host {
			display: block;
			font-size: 16px;
			font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
			line-height: 1.6em;
			color: black;
			text-align: left;
		}

		section {
			margin: 0;
		}

		table,
		td,
		div,
		a {
			box-sizing: border-box;
		}

		img {
			max-width: 100%;
		}

		table {
			border-collapse: separate !important;
			width: 100%;
		}

		table td {
			font-size: 87%;
		}

		table th {
			vertical-align: top;
			font-size: 75%;
			text-transform: uppercase;
			font-weight: normal;
			color: #aaaaaa;
		}

		h1 {
			color: #111111 !important;
			font-family: inherit;
			font-weight: 300;
			line-height: 1.4em;
			margin: 0;
			margin-bottom: 2em;
			font-size: 230%;
			text-transform: capitalize;
			text-align: center;
		}

		p {
			font-family: inherit;
			font-weight: normal;
			margin: 0 0 1.2em 0;
		}

		div,
		strong,
		p,
		span {
			padding-left: 0;
			padding-right: 0;
		}

		a {
			color: black;
			text-decoration: underline;
		}

		/* Utility classes used across multiple components */
		.align-center {
			text-align: center;
		}

		.align-right {
			text-align: right;
		}

		.align-left {
			text-align: left;
		}

		.receipt-strong {
			font-weight: bold;
			text-transform: uppercase;
		}

		.receipt-line-through {
			text-decoration: line-through;
		}
	}

	/* Scoped to Receipt */
	.content {
		display: block;
		max-width: 36em;
		margin: 0 auto;
		padding: 0.6em;
	}

	.main {
		background: #ffffff;
		border: 1px solid #e9e9e9;
		border-radius: 3px;
		width: 100%;
		padding: 2em;
	}

	@media print {
		:global(:host) {
			font-size: 7pt;
		}
	}

	@media only screen and (max-width: 620px) {
		:global(h1) {
			font-weight: 600 !important;
			font-size: 22px !important;
		}
		.content {
			padding: 10px !important;
		}
	}
</style>
