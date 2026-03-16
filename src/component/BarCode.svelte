<script lang="ts">
	import "../vendor/barcode-code128b";

	let { code }: { code: string } = $props();
</script>

<div class="content barcode" title={"Barcode: " + code}>
	<code-128b data={code} height="50"></code-128b>
</div>

<style>
	.barcode {
		padding: 2em;
		text-align: center;
	}
</style>
