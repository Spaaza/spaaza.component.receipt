<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawBusinessData } from "../common/receiptdata";

	let { business, strings }: {
		business: RawBusinessData;
		strings: LangBlock;
	} = $props();

	let address = $derived(
		[business.address.address_1, business.address.address_2, business.address.address_3].filter(Boolean).join(" ")
	);
	let postalCode = $derived(business.address.postal_code);
	let city = $derived(business.address.towncity);
</script>

<div class="receipt-store">
	{#if business.name}
		<div>{business.name}</div>
	{/if}
	{#if address}
		<div>{address}</div>
	{/if}
	{#if postalCode || city}
		<div>{postalCode} {city}</div>
	{/if}
	{#if business.email}
		<div><a href={"mailto:" + business.email}>{business.email}</a></div>
	{/if}
	{#if business.website_url}
		<div><a href={business.website_url} target="_blank" rel="noopener noreferrer">{business.website_url}</a></div>
	{/if}
	{#if business.phone_number}
		<a href={"tel:" + business.phone_number}>{business.phone_number}</a>
	{/if}
</div>
