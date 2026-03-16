<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawPaymentMethodData } from "../common/receiptdata";
	import { amount } from "../common/format";

	let { methods, currencySymbol, strings }: {
		methods: RawPaymentMethodData[];
		currencySymbol: string;
		strings: LangBlock;
	} = $props();
</script>

<table class="receipt-paymentmethods">
	<caption class="sr-only">{strings.caption}</caption>
<tbody>
	{#each methods as pm}
		<tr class="payment-method">
			<td class="var-rate align-left">{pm.payment_method}</td>
			<td class="order-value align-right">{amount(pm.payment_amount, currencySymbol)}</td>
		</tr>
	{/each}
</tbody></table>
