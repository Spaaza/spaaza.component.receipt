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

<table><tbody>
	{#if strings.message}
		<tr><td colspan="2">{strings.message}</td></tr>
	{/if}
	{#if total}
		<tr class="receipt-strong">
			<td>{strings.charged}</td>
			<td class="align-right">{amount(total, currencySymbol)}</td>
		</tr>
	{/if}
	{#if retailerCode}
		<tr>
			<td>{strings["order-number"]}</td>
			<td class="align-right">#{retailerCode}</td>
		</tr>
	{/if}
	{#if date}
		<tr>
			<td>{strings.date}</td>
			<td class="align-right">{new Date(date).toLocaleString(langCode)}</td>
		</tr>
	{/if}
	{#if employeeName}
		<tr>
			<td>{strings["employee-name"]}</td>
			<td class="align-right">{employeeName}</td>
		</tr>
	{/if}
</tbody></table>
