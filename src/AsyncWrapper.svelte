<script>
	import { Loader } from '@svelteuidev/core';

	export let awaitable;

	let dataFromAwaitable;

	const _awaitable = async () => {
		dataFromAwaitable = await awaitable();
	}
</script>

<style>
</style>

<div>

	{#await _awaitable()}
		<Loader />
	{:then _ignoreResult}
		<slot {dataFromAwaitable}/>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</div>
