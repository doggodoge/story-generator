<script>
	import Message from '../lib/components/Message.svelte';
	import Prompt from '../lib/components/Prompt.svelte';

	let message = '';
	let selected = '';
</script>

<main class="flex flex-col h-full w-full">
	<div class="flex flex-col flex-1 w-full gap-2 overflow-y-scroll">
		<Message>Test message</Message>
		<Message isCurrentUser>Some other thing</Message>
		<Message
			>This is a slightly longer message to test out how things go here with wrapping, etc.</Message
		>
	</div>
	<Prompt bind:value={message} bind:selected />
</main>
