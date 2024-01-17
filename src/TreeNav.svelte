<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = false
</script>

<script>
    import { slide, fade } from 'svelte/transition';
	import { Flex, Space, Anchor } from '@svelteuidev/core';

	export let items;

	export let indent;

	let expanded = _expansionState || false
	const toggleExpansion = () => {
		expanded = !expanded
	}
	$: arrowDown = expanded
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
    {#each items as item}
    <li>
		<Flex>
		<Space w={indent} />
        <span transition:fade={{ duration: 150 }}>
            <Anchor size='sm' override={{textDecoration: 'none'}} href={'#'+item['path']}>{item['name']}</Anchor>
            {#if (item['children']) }
            <span transition:slide on:click={toggleExpansion} class="arrow" class:arrowDown>&#x203a;</span>
            {:else}
            <span class="no-arrow"/>
            {/if}
        </span>
		</Flex>
		<hr/>
        {#if expanded && (item['children']) }
            <svelte:self indent={indent+8} items={item['children']}/>
        {/if}    
	</li>
    {/each}
</ul>
