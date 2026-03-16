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

<table class="receipt-wallet"><tbody>
	<tr><td class="receipt-strong">{wallet.title}</td></tr>
	{#if totalEarned}
		<tr>
			<td>{wallet.title} {strings.earned}</td>
			<td align="right">{amount(totalEarned, currencySymbol)}</td>
		</tr>
	{/if}
	{#if wallet.contributions.length > 1}
		{#each wallet.contributions as contrib}
			<tr>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;{contrib.campaign_title}</td>
				<td align="right">{amount(contrib.amount, currencySymbol)}</td>
			</tr>
		{/each}
	{/if}
	{#if totalSpent}
		<tr>
			<td>{wallet.title} {strings.spent}</td>
			<td align="right">{amount(totalSpent, currencySymbol)}</td>
		</tr>
	{/if}
	<tr>
		<td>{strings["new-balance"]}</td>
		<td align="right" class="receipt-strong">{amount(wallet.total, currencySymbol)}</td>
	</tr>
</tbody></table>
