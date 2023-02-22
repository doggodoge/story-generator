<script>
	export let username = 'Anonymous';
	export let isCurrentUser = false;
</script>

<div
	class="flex flex-col p-3 rounded shadow max-w-md {isCurrentUser
		? 'self-end bg-white text-black'
		: 'self-start bg-orange-500 text-white'}"
>
	<div class="italic text-sm">{username}</div>
	<slot />
</div>
