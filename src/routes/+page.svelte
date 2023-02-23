<script>
    import { goto } from "$app/navigation";
    import { browser } from '$app/environment';

    let apiKey = '';

    if (browser && window.localStorage.getItem('api_key') !== null) {
        goto('/storytime');
    }

    function saveApiKey() {
        window.localStorage.setItem('api_key', apiKey);
        goto('/storytime');
    }
</script>

<div class="flex flex-col p-3 gap-2 shadow-md">
    <h1 class="font-bold text-xl">OpenAI API Key</h1>
    <p>
        Please provide your OpenAI API Key.
        This will be stored in local storage, and won't be saved on a server.
    </p>
    <input class="px-2 outline outline-blue-200 focus:outline-blue-400 shadow rounded" type="password" bind:value={apiKey}>
    <button class="py-1 bg-blue-600 text-white rounded shadow" on:click={saveApiKey}>Ok</button>
</div>
