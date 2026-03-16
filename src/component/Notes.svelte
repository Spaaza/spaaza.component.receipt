<script lang="ts">
	let { notes, customNotes }: {
		notes?: string;
		customNotes?: string;
	} = $props();
</script>

<div class="receipt-notes">
	{#if customNotes}
		<p>{customNotes}</p>
	{:else if notes}
		<p>{notes}</p>
	{/if}
</div>

<style>
	.receipt-notes p {
		text-align: center;
	}
</style>
