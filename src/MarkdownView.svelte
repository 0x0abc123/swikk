<script>
	import { Container, Flex, Space, Anchor } from '@svelteuidev/core';

	import AsyncWrapper from './AsyncWrapper.svelte';

	import { marked } from 'marked';

	export let pageViewed;
	export let prevPage;
	export let nextPage;

	const MARKDOWN_FOLDER_PREFIX = '/md/';

	const loadPage = async (pagePath) => {
		let htmlFromMD = 
		fetch(`${MARKDOWN_FOLDER_PREFIX}${pagePath}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(markdownContent => {
			return marked.parse(markdownContent);
        })
        .catch(error => {
          console.error('Error during fetch operation:', error);
        });

		return htmlFromMD;
	}
</script>

 
 <style>
 
	 .markdown-content {
	 }
 
 </style>

<Container>
	<AsyncWrapper awaitable={() => loadPage(pageViewed)} let:dataFromAwaitable>		
		<div class="markdown-content">
			{@html dataFromAwaitable}
		 </div>
	</AsyncWrapper>

	<Flex>
		{#if prevPage}
		<Anchor override={{textDecoration: 'none'}} href={'#'+prevPage}>&lt; Prev</Anchor>
		<Space w="xl"/>
		{/if}
		{#if nextPage}
		<Anchor override={{textDecoration: 'none'}} href={'#'+nextPage}>Next &gt;</Anchor>
		{/if}

	</Flex>
</Container>

