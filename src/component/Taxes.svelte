<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawTaxLineData } from "../common/receiptdata";
	import { amount } from "../common/format";

	let { taxes, currencySymbol, strings }: {
		taxes: RawTaxLineData[];
		currencySymbol: string;
		strings: LangBlock;
	} = $props();
</script>

<table class="receipt-linetaxes">
	<caption class="sr-only">{strings.caption}</caption>
	<thead>
		<tr>
			<th class="align-left">{strings["tax-rate"]}</th>
			<th class="align-center">{strings["order-value"]}</th>
			<th class="align-right">{strings["tax-value"]}</th>
		</tr>
	</thead>
	<tbody>
		{#each taxes as tax}
			<tr class="tax-line">
				<td class="var-rate align-left">{Math.round(tax.rate * 100)}%</td>
				<td class="order-value align-center">{amount(tax.order_value, currencySymbol)}</td>
				<td class="vat align-right">{amount(tax.tax_value, currencySymbol)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th, td {
		width: 33%;
	}
</style>
