<script>
	/** @type {string} */
	export let value;
	let isEditable = false;

	function handleOnClick() {
		isEditable = true;
	}

	/** @param {KeyboardEvent} event */
	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === 'Escape') {
			isEditable = false;
		}
	}

	function handleBlur() {
		isEditable = false;
	}
</script>

<div class="italic text-sm">
	{#if isEditable}
		<input
			class="px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
			type="text"
			bind:value
			on:keydown={handleKeyDown}
			on:blur={handleBlur}
		/>
	{:else}
		<button on:click={handleOnClick}>{value}</button>
	{/if}
</div>
