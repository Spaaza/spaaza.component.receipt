<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawLineItemData } from "../common/receiptdata";
	import { amount } from "../common/format";

	let { items, currencySymbol, strings }: {
		items: RawLineItemData[];
		currencySymbol: string;
		strings: LangBlock;
	} = $props();
</script>

<table class="receipt-lineitems">
	<thead>
		<tr>
			<th class="align-left receipt-name">{strings.name}</th>
			<th class="align-right receipt-quantity">{strings.quantity}</th>
			<th class="align-right receipt-price">{strings.price}</th>
			<th class="align-right receipt-line-total">{strings["line-total"]}</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			{@const isOnSale = Math.abs(item.original_price) > Math.abs(item.sale_price)}
			<tr class="line-item">
				<td class="align-left receipt-name">
					{#if item.name}<strong>{item.name}</strong>{/if}
					<div>{item.barcode}</div>
				</td>
				<td class="align-right receipt-quantity">{item.quantity}{item.quantity_unit !== "item" ? item.quantity_unit : ""}</td>
				<td class="align-right receipt-price">
					{#if isOnSale}<div class="receipt-line-through">{amount(item.original_price, currencySymbol, true)}</div>{/if}
					<div>{amount(item.sale_price, currencySymbol, true)}</div>
				</td>
				<td class="align-right receipt-price">
					<div class="receipt-sale-price receipt-strong">{amount(item.sale_price * item.quantity, currencySymbol)}</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th.receipt-name,
	td.receipt-name {
		width: 50%;
	}
	th.receipt-price,
	td.receipt-price {
		width: 17%;
	}
	th.receipt-quantity,
	td.receipt-quantity {
		width: 5%;
	}
</style>
