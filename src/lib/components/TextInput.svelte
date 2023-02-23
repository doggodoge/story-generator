<script>
	export let value = '';
	let tokens;
	let numberOfTokens;
	$: {
		tokens = value.split(/\s+|[^\w\s]/); // split by whitespace or non-word characters (punctuation)
		numberOfTokens = tokens.length;
	}

	export let placeholder = '';
	export let maxLength = 2000;
</script>

<div class="flex flex-col relative">
	<textarea
		class="px-3 w-full max-h-36 rounded-sm shadow focus:shadow-md outline-none transition resize-none {numberOfTokens >
		maxLength
			? 'shadow-red-600'
			: ''}"
		maxlength={maxLength}
		{placeholder}
		bind:value
	></textarea>
	<div class="text-xs absolute bottom-1 right-5">
		{numberOfTokens} / {maxLength}
	</div>
</div>
