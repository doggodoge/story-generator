<script>
	import Message from '../lib/components/Message.svelte';
	import Prompt from '../lib/components/Prompt.svelte';

	let username = 'Person Number 1';
	let currentMessage = '';
	let messages = [];

	async function addNewMessage() {
		messages = [...messages, { username, message: currentMessage, isCurrentUser: true }];
		const response = await fetch('/api/gpt', {
			method: 'POST',
			body: `[${username}]: ${currentMessage}`,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
		const generatedResponse = await response.text();
		console.log(generatedResponse);
		messages = [...messages, { username: 'AI', message: generatedResponse, isCurrentUser: false }];
	}
</script>

<main class="flex flex-col h-full max-h-full gap-3 overflow-auto">
	<div class="flex flex-col flex-1 gap-2 px-2 overflow-y-auto">
		{#each messages as message}
			<Message username={message.username} isCurrentUser={message.isCurrentUser}>
				<p slot="content">{message.message}</p>
			</Message>
		{/each}
	</div>
	<div class="p-1">
		<Prompt bind:value={currentMessage} bind:username on:click={addNewMessage} />
	</div>
</main>
