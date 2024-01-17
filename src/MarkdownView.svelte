<script>
	import { Container, Flex, Space, Anchor } from '@svelteuidev/core';
	
	import AsyncWrapper from './AsyncWrapper.svelte';

	import { Marked } from 'marked';
	import { markedHighlight } from "marked-highlight";
	import hljs from 'highlight.js';

	export let pageViewed;
	export let prevPage;
	export let nextPage;

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

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
			let md = marked.parse(markdownContent);
			return md

        })
        .catch(error => {
          console.error('Error during fetch operation:', error);
        });

		return htmlFromMD;
	}
</script>

 
 <style>
 
	.markdown-content {
		overflow: auto;
		max-height: 82vh;
	}
 
	.markdown-content :global(td)  {
		border: 1px solid #ddd;
		padding: 8px;
	}

	.markdown-content :global(th)  {
		padding: 8px;
		text-align: left;
		background-color: #444444;
		color: white;
	}

</style>

<Container override={{overflow: 'hidden'}}>
	<AsyncWrapper awaitable={() => loadPage(pageViewed)} let:dataFromAwaitable>		
		<div class="markdown-content">
			{@html dataFromAwaitable}
		 </div>
	</AsyncWrapper>
	<Space h="md"/>
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

