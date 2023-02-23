<script>
	import TextInput from './TextInput.svelte';
	import EditableText from '$lib/components/EditableText.svelte';

	export let value = '';
	export let username = 'Anonymous';
</script>

<div class="flex flex-row gap-2 items-end z-10">
	<div class="flex flex-col w-full gap-2">
		<div class="pl-2"><EditableText bind:value={username} /></div>
		<div class="flex flex-row gap-2">
			<div class="flex-1">
				<TextInput bind:value />
			</div>
			<button
				class="bg-blue-600 text-white px-2 rounded shadow hover:shadow-md active:shadow transition"
				on:click
			>
				Send
			</button>
		</div>
	</div>
</div>
