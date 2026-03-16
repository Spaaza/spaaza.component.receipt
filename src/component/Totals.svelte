<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawVoucherData } from "../common/receiptdata";
	import { amount } from "../common/format";

	let { total, subtotal, basketVouchers, currencySymbol, strings }: {
		total: number;
		subtotal: number;
		basketVouchers: RawVoucherData[];
		currencySymbol: string;
		strings: LangBlock;
	} = $props();
</script>

<table class="receipt-totals">
	<caption class="sr-only">{strings.caption}</caption>
<tbody>
	{#each basketVouchers as vouch}
		<tr>
			<td>{strings.voucher}: {vouch.campaign_title}</td>
			<td align="right" class="voucher">{amount(vouch.amount * -1, currencySymbol)}</td>
		</tr>
	{/each}
	<tr class="receipt-subtotal">
		<td>{strings.subtotal}</td>
		<td class="align-right">{amount(subtotal, currencySymbol)}</td>
	</tr>
	<tr class="receipt-strong receipt-total">
		<td>{strings.total}</td>
		<td class="align-right">{amount(total, currencySymbol)}</td>
	</tr>
</tbody></table>

<style>
	.receipt-total td {
		font-size: inherit;
	}
</style>
