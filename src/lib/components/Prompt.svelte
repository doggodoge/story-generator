<script>
	import TextInput from './TextInput.svelte';

	export let value = '';
	export let selected = 'first';
</script>

<div class="flex flex-row gap-2">
	<select class="bg-white rounded shadow focus:shadow-md transition" name="dialog-selection" id="dialog-selection" bind:value={selected}>
		<option value="first">First</option>
		<option value="second">Second</option>
		<option value="third">Third</option>
	</select>
  <div class="flex-1">
    <TextInput bind:value />
  </div>
	<button
		class="bg-blue-600 text-white px-2 h-10 rounded shadow hover:shadow-md active:shadow transition"
    on:click={() => console.log('button clicked')}
		>Send</button
	>
</div>
