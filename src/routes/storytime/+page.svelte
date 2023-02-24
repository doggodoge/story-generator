<script>
	import Message from '$lib/components/Message/Message.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
	import { parse } from '$lib/lexers/storyLexer.js';
	import { getCompletion } from '$lib/ai/gpt.js';

	/** @typedef {import('$lib/types/types').Message} Message */

	let username = 'Person Number 1';
	let currentMessage = '';
	/** @type {Message[]}  */
	let messages = [];
	/** @type {'dialog' | 'action'} */
	let type = 'dialog';
	/** @type {string} */
	let context = '';

	function generatePrompt() {
		if (type === 'dialog') {
			return `[${username}]: ${currentMessage}`;
		}
		return `-[${currentMessage}]`;
	}

	async function addNewMessage() {
		messages = [...messages, { username, message: currentMessage, isCurrentUser: true, type }];
		const generatedResponse = await getCompletion(generatePrompt(), context);
		const parsedStory = parse(generatedResponse);
		console.log(parsedStory);

		/** @type {Message[]} */
		// @ts-ignore
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
				if (token.type === 'context') {
					context += ` ${token.value}`;
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
