<script>
	import TextInput from './TextInput.svelte';
	import EditableText from '$lib/components/EditableText.svelte';
	import Choice from '$lib/components/Choice.svelte';

	const choices = [
		{ name: 'dialog', text: 'Dialog' },
		{ name: 'action', text: 'Action' }
	];
	export let type = 'dialog';

	export let value = '';
	export let username = 'Anonymous';
</script>

<div class="flex flex-row gap-2 items-end z-10">
	<div class="flex flex-col w-full gap-2">
		<div class="pl-2"><EditableText bind:value={username} /></div>
		<div class="flex flex-col sm:flex-row w-full gap-2">
			<Choice {choices} bind:selection={type} />
			<div class="flex flex-row gap-2 w-full">
				<TextInput bind:value />
				<button
					class="bg-blue-600 text-white px-2 rounded shadow hover:shadow-md active:shadow transition"
					on:click
				>
					Send
				</button>
			</div>
		</div>
	</div>
</div>
