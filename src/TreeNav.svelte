<script>
	import { Flex, Space, Anchor } from '@svelteuidev/core';
	import { writable } from "svelte/store"

	export let items;
	export let indent;

	let toggled = false;

	const toggleExpansion = (item) => {
		if (item['expanded']) {
			item['expanded'] = false;
		} else {
			item['expanded'] = true;
		}
		toggled = !toggled;
	}

	let isExpanded = (item) => {
		return item['expanded']
	}
</script>

<style>
    ul {
		margin: 0;
		padding-left: 0;
		list-style: none;
		user-select: none;
	}

	li {
		padding-left: 0;
	}

	hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid #ccc;
		margin: 0.5em 0;
		padding: 0;
	}

	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		padding-left: 0.5em;
		cursor: pointer;
		display: inline-block;
		transition: transform 200ms;
	}
	.arrowDown { transform: rotate(90deg); }
</style>

<ul>
	{#key toggled}
    {#each items as item}
    <li>
		<Flex>
		<Space w={indent} />
        <span>
		<Anchor size='sm' override={{textDecoration: 'none'}} href={'#'+item['path']}>{item['name']}</Anchor>
            {#if (item['children']) }
            <span on:click={toggleExpansion(item)} class="arrow" class:arrowDown={isExpanded(item)}>&#x203a;</span>
            {:else}
            <span class="no-arrow"/>
            {/if}
        </span>
		</Flex>
		<hr/>
        {#if isExpanded(item) && item['children'] }
            <svelte:self indent={indent+8} items={item['children']}/>
        {/if}    
	</li>
    {/each}
	{/key}
</ul>
