<script>
	import Dialog from '$lib/components/Message/lib/Dialog.svelte';
	import Action from '$lib/components/Message/lib/Action.svelte';

	export let username = 'Anonymous';
	export let isCurrentUser = false;
	/** @type {'dialog' | 'action'} */
	export let type = 'dialog';
</script>

{#if type === 'dialog'}
	<Dialog {username} {isCurrentUser}>
		<slot slot="content" name="content" />
	</Dialog>
{:else}
	<Action>
		<slot slot="content" name="content" />
	</Action>
{/if}
