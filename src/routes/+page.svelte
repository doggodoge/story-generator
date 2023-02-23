<script>
	import Message from '$lib/components/Message/Message.svelte';
	import Prompt from '../lib/components/Prompt.svelte';
	import { parse } from '../lib/lexers/storyLexer';

	let username = 'Person Number 1';
	let currentMessage = '';
	let messages = [];
	let type = 'dialog';

	function generatePrompt() {
		if (type === 'dialog') {
			return `[${username}]: ${currentMessage}`;
		}
		return `-[${currentMessage}]`;
	}

	async function addNewMessage() {
		messages = [...messages, { username, message: currentMessage, isCurrentUser: true, type }];
		const response = await fetch('/api/gpt', {
			method: 'POST',
			body: generatePrompt(),
			headers: {
				'Content-Type': 'text/plain'
			}
		});
		const generatedResponse = await response.text();
		const parsedStory = parse(generatedResponse);
		console.log(parsedStory);
		const newMessages = parsedStory
			.map((token, index) => {
				if (token.type === 'character') {
					return {
						username: token.value,
						message: parsedStory[index + 1].value,
						isCurrentUser: token.value === username,
						type: 'dialog'
					};
				}
				if (token.type === 'action') {
					return {
						username: 'Unknown',
						message: token.value,
						isCurrentUser: false,
						type: 'action'
					};
				}
				return null;
			})
			.filter((message) => message !== null);
		messages = [...messages, ...newMessages];
	}
</script>

<main class="flex flex-col h-full max-h-full gap-3 overflow-auto">
	<div class="flex flex-col flex-1 gap-2 px-2 overflow-y-auto">
		{#each messages as message}
			<Message
				username={message.username}
				isCurrentUser={message.isCurrentUser}
				type={message.type}
			>
				<p slot="content">{message.message}</p>
			</Message>
		{/each}
	</div>
	<div class="p-1">
		<Prompt bind:value={currentMessage} bind:username on:click={addNewMessage} bind:type />
	</div>
</main>
