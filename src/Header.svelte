<script>
	import {
		Group,
		Text,
        Switch,
		Button,
		Space
	} from '@svelteuidev/core';

	import {
		Moon,
		Sun,
		Reader
	} from 'radix-icons-svelte';

    export let darkModeToggle;

</script>

<style>
	.svlt0-header-logo {
		height: 64px;
		width: auto;
	}
</style>

<Group position="apart" spacing="sm" noWrap>

    <Group>
        <img class="svlt0-header-logo" src="/logo.png"/>
    </Group>

    <Group>
        <Sun size={16} color={'white'}/><Switch on:change={darkModeToggle} /><Moon size={16} color={'white'}/><Space w="lg"/>
    </Group>

</Group>
