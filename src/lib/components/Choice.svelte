<script>
	/** @type {Array<{ name: string; text: string; }>} */
	export let choices = [];
    /** @type {string} */
	export let selection = '';
</script>

<div class="flex flex-col gap-1">
	{#each choices as choice (choice.name)}
		<button
			on:click={() => (selection = choice.name)}
			class="px-2 py-1 {choice.name === selection ? 'bg-blue-600 text-white shadow rounded' : ''}"
		>
			{choice.text}
		</button>
	{/each}
</div>
