<script>
	export let username = 'Anonymous';
	export let isCurrentUser = false;
</script>

<div
	class="flex flex-col p-3 rounded shadow max-w-md {isCurrentUser
		? 'self-end bg-white text-black'
		: 'self-start bg-blue-600 text-white'}"
	whitespace="preserve"
>
	<div class="font-bold text-sm">{username}</div>
	<div class="whitespace-pre-wrap">
		<slot name="content" />
	</div>
</div>
