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

<table role="presentation"><tbody>
	{#if logoURL}
		<tr><td><img class="brand_logo" src={logoURL} alt={strings.title || "Logo"} /></td></tr>
	{/if}
	{#if strings.title}
		<tr><td><h1>{strings.title}</h1></td></tr>
	{/if}
	{#if strings.message && (user?.id || shopper?.id)}
		<tr><td><p>{strings.message}</p></td></tr>
	{/if}
</tbody></table>

<style>
	img.brand_logo {
		display: block;
		margin: 3em auto;
		height: 6em;
	}
</style>
