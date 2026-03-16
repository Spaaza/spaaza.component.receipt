<script lang="ts">
	import "../vendor/barcode-code128b";

	let { code }: { code: string } = $props();
</script>

<div role="img" aria-label={"Barcode: " + code}>
	<code-128b data={code} height="50"></code-128b>
</div>

<style>
	div {
		padding: 2em;
	}
</style>
