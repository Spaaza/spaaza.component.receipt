<script lang="ts">
	import type { LangBlock } from "../common/language";
	import { amount } from "../common/format";

	let { wallet, totalEarned, totalSpent, currencySymbol, strings }: {
		wallet: {
			title: string;
			total: number;
			contributions: { campaign_title: string; amount: number }[];
		};
		totalEarned: number;
		totalSpent: number;
		currencySymbol: string;
		strings: LangBlock;
	} = $props();
</script>

<div class="receipt-wallet">
	<p class="receipt-strong">{wallet.title}</p>
	<dl class="wallet-details">
		{#if totalEarned}
			<div>
				<dt>{wallet.title} {strings.earned}</dt>
				<dd>{amount(totalEarned, currencySymbol)}</dd>
			</div>
		{/if}
		{#if wallet.contributions.length > 1}
			{#each wallet.contributions as contrib}
				<div>
					<dt class="wallet-contribution">{contrib.campaign_title}</dt>
					<dd>{amount(contrib.amount, currencySymbol)}</dd>
				</div>
			{/each}
		{/if}
		{#if totalSpent}
			<div>
				<dt>{wallet.title} {strings.spent}</dt>
				<dd>{amount(totalSpent, currencySymbol)}</dd>
			</div>
		{/if}
		<div>
			<dt>{strings["new-balance"]}</dt>
			<dd class="receipt-strong">{amount(wallet.total, currencySymbol)}</dd>
		</div>
	</dl>
</div>

<style>
	.wallet-details {
		display: grid;
		grid-template-columns: 1fr auto;
		margin: 0;
	}
	.wallet-details > div {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
	}
	.wallet-details dt,
	.wallet-details dd {
		margin: 0;
	}
	.wallet-details dd {
		text-align: right;
	}
	.wallet-contribution {
		padding-left: 1.5em;
	}
	.receipt-wallet p {
		margin: 0;
	}
</style>
