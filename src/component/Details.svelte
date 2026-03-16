<script lang="ts">
	import type { LangBlock } from "../common/language";
	import { amount } from "../common/format";

	let { total, date, retailerCode, currencySymbol, employeeName, employeeCode, strings, langCode }: {
		total: number;
		date: string;
		retailerCode?: string;
		currencySymbol: string;
		employeeName: string;
		employeeCode: string;
		strings: LangBlock;
		langCode: string;
	} = $props();
</script>

<div>
	{#if strings.message}
		<p>{strings.message}</p>
	{/if}
	<dl class="receipt-details">
		{#if total}
			<div class="receipt-strong">
				<dt>{strings.charged}</dt>
				<dd>{amount(total, currencySymbol)}</dd>
			</div>
		{/if}
		{#if retailerCode}
			<div>
				<dt>{strings["order-number"]}</dt>
				<dd>#{retailerCode}</dd>
			</div>
		{/if}
		{#if date}
			<div>
				<dt>{strings.date}</dt>
				<dd>{new Date(date).toLocaleString(langCode)}</dd>
			</div>
		{/if}
		{#if employeeName}
			<div>
				<dt>{strings["employee-name"]}</dt>
				<dd>{employeeName}</dd>
			</div>
		{/if}
	</dl>
</div>

<style>
	.receipt-details {
		display: grid;
		grid-template-columns: 1fr auto;
		margin: 0;
	}
	.receipt-details > div {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
	}
	.receipt-details dt,
	.receipt-details dd {
		margin: 0;
	}
	.receipt-details dd {
		text-align: right;
	}
</style>
