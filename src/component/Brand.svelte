<script lang="ts">
	import type { LangBlock } from "../common/language";
	import type { RawUserData } from "../common/receiptdata";

	let { logoURL, user, shopper, strings }: {
		logoURL: string;
		user?: RawUserData;
		shopper?: RawUserData;
		strings: LangBlock;
	} = $props();
</script>

<div>
	{#if logoURL}
		<img class="brand_logo" src={logoURL} alt={strings.title || "Logo"} />
	{/if}
	{#if strings.title}
		<h1>{strings.title}</h1>
	{/if}
	{#if strings.message && (user?.id || shopper?.id)}
		<p>{strings.message}</p>
	{/if}
</div>

<style>
	img.brand_logo {
		display: block;
		margin: 3em auto;
		height: 6em;
	}
</style>
