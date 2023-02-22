<script>
	import Message from '../lib/components/Message.svelte';
	import Prompt from '../lib/components/Prompt.svelte';

	let currentMessage = '';
	let messages = [];

	/** @type {string | undefined} */
	let selected;

	async function addNewMessage() {
		messages = [...messages, { username: 'Person', message: currentMessage, isCurrentUser: true }];
		const response = await fetch('/api/gpt', {
			method: 'POST',
			body: currentMessage,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
		const generatedResponse = await response.text();
		messages = [...messages, { username: 'AI', message: generatedResponse, isCurrentUser: false }];
	}
</script>

<main class="flex flex-col h-full gap-3 overflow-visible">
	<div class="flex flex-col flex-1 w-full gap-2 overflow-y-scroll">
		{#each messages as message}
			<Message username={message.username} isCurrentUser={message.isCurrentUser}>
				{message.message}
			</Message>
		{/each}
	</div>
	<Prompt bind:value={currentMessage} bind:selected on:click={addNewMessage} />
</main>
